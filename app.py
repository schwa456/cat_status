from flask import Flask, render_template, request, redirect, url_for, flash
import csv
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = "secret_key"

# 데이터 파일 경로
FILE_PATH = "cat_activity_health_data.csv"
BLOOD_TEST_FILE_PATH = "cat_blood_test_data.csv"

# 데이터 파일 생성
if not os.path.exists(FILE_PATH):
    with open(FILE_PATH, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Date", "Cat Name", "Weight", "Meal Grams", "Litter Box", "Play Time", "Sleep Time"])

if not os.path.exists(BLOOD_TEST_FILE_PATH):
    with open(BLOOD_TEST_FILE_PATH, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Date", "Cat Name", "Blood Test 1", "Blood Test 2", "Blood Test 3", "Blood Test 4"])

# 혈액검사 결과 입력 페이지
@app.route('/blood_test', methods=['GET', 'POST'])
def blood_test():
    if request.method == 'POST':
        cat_name = request.form['cat_name']
        blood_test_1 = request.form['blood_test_1']
        blood_test_2 = request.form['blood_test_2']
        blood_test_3 = request.form['blood_test_3']
        blood_test_4 = request.form['blood_test_4']

        if not cat_name or not blood_test_1 or not blood_test_2 or not blood_test_3 or not blood_test_4:
            flash("모든 혈액검사 항목을 입력하세요.", "warning")
            return redirect(url_for('blood_test'))

        try:
            blood_test_1 = float(blood_test_1)
            blood_test_2 = float(blood_test_2)
            blood_test_3 = float(blood_test_3)
            blood_test_4 = float(blood_test_4)
        except ValueError:
            flash("혈액검사 결과는 숫자로 입력해야 합니다.", "warning")
            return redirect(url_for('blood_test'))

        current_date = datetime.now().strftime("%Y-%m-%d")
        with open(BLOOD_TEST_FILE_PATH, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([current_date, cat_name, blood_test_1, blood_test_2, blood_test_3, blood_test_4])

        flash("혈액검사 결과가 저장되었습니다.", "success")
        return redirect(url_for('blood_test'))

    return render_template('blood_test.html')

# 혈액검사 기록 보기
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
