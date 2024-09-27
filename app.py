from flask import Flask, render_template, request, redirect, url_for, flash
import csv
import os
from datetime import datetime
import matplotlib.pyplot as plt

app = Flask(__name__)
app.secret_key = "secret_key"

# 데이터 파일 경로
HEALTH_FILE_PATH = "cat_activity_health_data.csv"
BLOOD_TEST_FILE_PATH = "cat_blood_test_data.csv"

# 데이터 파일 생성
if not os.path.exists(HEALTH_FILE_PATH):
    with open(HEALTH_FILE_PATH, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(
            ["Date", "Cat Name", "Weight", "Meal Grams", "Litter Box", "Play Time", "Sleep Time"])

if not os.path.exists(BLOOD_TEST_FILE_PATH):
    with open(BLOOD_TEST_FILE_PATH, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Date", "Cat Name", "Blood Test 1", "Blood Test 2", "Blood Test 3", "Blood Test 4"])


# 기록 저장 함수
def save_health_record(data):
    with open(HEALTH_FILE_PATH, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(data)

def save_blood_record(data):
    with open(BLOOD_TEST_FILE_PATH, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(data)


# 기록 불러오기 함수
def get_health_records():
    records = []
    with open(HEALTH_FILE_PATH, mode='r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[0] != "Date":
                records.append(row)
    return records

def get_blood_records():
    records = []
    with open(BLOOD_TEST_FILE_PATH, mode='r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[0] != "Date":
                records.append(row)
    return records


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/save', methods=['POST'])
def save():
    cat_name = request.form['cat_name']
    weight = request.form['weight']
    meal_grams = request.form['meal_grams']
    litter = request.form['litter']
    play = request.form['play']
    sleep = request.form['sleep']

    if not cat_name or not weight or not meal_grams or not litter or not play or not sleep:
        flash("모든 항목을 입력하세요.", "warning")
        return redirect(url_for('index'))

    try:
        weight = float(weight)
        meal_grams = float(meal_grams)
        litter = int(litter)
        play = int(play)
        sleep = int(sleep)
    except ValueError:
        flash("정확한 형식으로 입력하세요.", "warning")
        return redirect(url_for('index'))

    current_date = datetime.now().strftime("%Y-%m-%d")
    save_health_record([current_date, cat_name, weight, meal_grams, litter, play, sleep])

    flash("기록이 저장되었습니다.", "success")
    return redirect(url_for('index'))


@app.route('/view')
def view_records():
    records = get_health_records()
    return render_template('view.html', records=records)


@app.route('/graph')
def show_health_graph():
    dates, weight, meal_grams, litter, play, sleep = [], [], [], [], [], []

    with open(HEALTH_FILE_PATH, mode='r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[0] != "Date":
                dates.append(row[0])
                weight.append(float(row[2]) if row[2] else None)
                meal_grams.append(float(row[3]) if row[3] else None)
                litter.append(float(row[4]) if row[4] else None)
                play.append(float(row[5]) if row[5] else None)
                sleep.append(float(row[6]) if row[6] else None)

    if not dates or not any(weight) or not any(meal_grams) or not any(litter) or not any(play) or not any(sleep):
        flash("기록된 활동 데이터가 없습니다.", "warning")
        return redirect(url_for('index'))

    plt.plot(dates, weight, marker='o', label='weight')
    plt.plot(dates, meal_grams, marker='o', label='meal_grams')
    plt.plot(dates, litter, marker='o', label='litter')
    plt.plot(dates, play, marker='o', label='play')
    plt.plot(dates, sleep, marker='o', label='sleep')
    plt.xlabel('날짜')
    plt.ylabel('수치')
    plt.title('활동  데이터 수치 변화')
    plt.xticks(rotation=45)
    plt.legend()
    plt.tight_layout()
    plt.savefig('static/images/health_graph.png')
    plt.close()

    return render_template('graph.html')

# 혈액검사 결과 입력 페이지
@app.route('/blood_test', methods=['GET', 'POST'])
def blood_test():
    if request.method == 'POST':
        cat_name = request.form['cat_name']
        WBC = request.form['WBC']
        HCT = request.form['HCT']
        RBC = request.form['RBC']
        HGB = request.form['HGB']

        if not cat_name or not WBC or not HCT or not RBC or not HGB:
            flash("모든 혈액검사 항목을 입력하세요.", "warning")
            return redirect(url_for('blood_test'))

        try:
            WBC = float(WBC)
            HCT = float(HCT)
            RBC = float(RBC)
            HGB = float(HGB)
        except ValueError:
            flash("혈액검사 결과는 숫자로 입력해야 합니다.", "warning")
            return redirect(url_for('blood_test'))

        current_date = datetime.now().strftime("%Y-%m-%d")
        with open(BLOOD_TEST_FILE_PATH, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([current_date, cat_name, WBC, HCT, RBC, HGB])

        flash("혈액검사 결과가 저장되었습니다.", "success")
        return redirect(url_for('blood_test'))

    return render_template('blood_test.html')

@app.route('/view_blood_tests')
def view_blood_tests():
    records = []
    with open(BLOOD_TEST_FILE_PATH, mode='r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[0] != "Date":
                records.append(row)
    return render_template('view_blood_tests.html', records=records)

if __name__ == '__main__':
    app.run(debug=True)
