from flask import Flask, render_template, request, redirect, url_for, flash
import csv
import os
from datetime import datetime
import matplotlib.pyplot as plt

app = Flask(__name__)
app.secret_key = "secret_key"

# 데이터 파일 경로
FILE_PATH = "cat_activity_health_data.csv"

# 데이터 파일 생성
if not os.path.exists(FILE_PATH):
    with open(FILE_PATH, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(
            ["Date", "Cat Name", "Weight", "Meal Grams", "Litter Box", "Play Time", "Sleep Time", "Blood Test 1",
             "Blood Test 2"])


# 기록 저장 함수
def save_record(data):
    with open(FILE_PATH, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(data)


# 기록 불러오기 함수
def get_records():
    records = []
    with open(FILE_PATH, mode='r') as file:
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
    blood_test_1 = request.form['blood_test_1']
    blood_test_2 = request.form['blood_test_2']

    if not cat_name or not weight or not meal_grams or not litter or not play or not sleep:
        flash("모든 항목을 입력하세요.", "warning")
        return redirect(url_for('index'))

    try:
        weight = float(weight)
        meal_grams = float(meal_grams)
        litter = int(litter)
        play = int(play)
        sleep = int(sleep)
        blood_test_1 = float(blood_test_1) if blood_test_1 else None
        blood_test_2 = float(blood_test_2) if blood_test_2 else None
    except ValueError:
        flash("정확한 형식으로 입력하세요.", "warning")
        return redirect(url_for('index'))

    current_date = datetime.now().strftime("%Y-%m-%d")
    save_record([current_date, cat_name, weight, meal_grams, litter, play, sleep, blood_test_1, blood_test_2])

    flash("기록이 저장되었습니다.", "success")
    return redirect(url_for('index'))


@app.route('/view')
def view_records():
    records = get_records()
    return render_template('view.html', records=records)


@app.route('/graph')
def show_health_graph():
    dates, blood_test_1, blood_test_2 = [], [], []

    with open(FILE_PATH, mode='r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[0] != "Date":
                dates.append(row[0])
                blood_test_1.append(float(row[7]) if row[7] else None)
                blood_test_2.append(float(row[8]) if row[8] else None)

    if not dates or not any(blood_test_1) or not any(blood_test_2):
        flash("기록된 혈액검사 데이터가 없습니다.", "warning")
        return redirect(url_for('index'))

    plt.plot(dates, blood_test_1, marker='o', label='혈액검사 1')
    plt.plot(dates, blood_test_2, marker='o', label='혈액검사 2')
    plt.xlabel('날짜')
    plt.ylabel('수치')
    plt.title('혈액검사 수치 변화')
    plt.xticks(rotation=45)
    plt.legend()
    plt.tight_layout()
    plt.savefig('static/images/health_graph.png')
    plt.close()

    return render_template('graph.html')


if __name__ == '__main__':
    app.run(debug=True)
