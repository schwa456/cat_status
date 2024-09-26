import tkinter as tk
from tkinter import messagebox
from tkcalendar import Calendar
import csv
import os
import matplotlib.pyplot as plt
from datetime import datetime

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
def save_record():
    cat_name = name_entry.get()
    weight = weight_entry.get()
    meal_grams = meal_grams_entry.get()
    litter = litter_entry.get()
    play = play_entry.get()
    sleep = sleep_entry.get()
    blood_test_1 = blood_test_1_entry.get()
    blood_test_2 = blood_test_2_entry.get()

    if not cat_name or not weight or not meal_grams or not litter or not play or not sleep:
        messagebox.showwarning("입력 오류", "모든 항목을 입력하세요.")
        return

    try:
        weight = float(weight)
        meal_grams = float(meal_grams)
        litter = int(litter)
        play = int(play)
        sleep = int(sleep)
        blood_test_1 = float(blood_test_1) if blood_test_1 else None
        blood_test_2 = float(blood_test_2) if blood_test_2 else None
    except ValueError:
        messagebox.showwarning("입력 오류", "정확한 형식으로 입력하세요. 몸무게와 사료는 실수, 나머지는 정수로 입력.")
        return

    current_date = datetime.now().strftime("%Y-%m-%d")
    with open(FILE_PATH, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([current_date, cat_name, weight, meal_grams, litter, play, sleep, blood_test_1, blood_test_2])

    name_entry.delete(0, tk.END)
    weight_entry.delete(0, tk.END)
    meal_grams_entry.delete(0, tk.END)
    litter_entry.delete(0, tk.END)
    play_entry.delete(0, tk.END)
    sleep_entry.delete(0, tk.END)
    blood_test_1_entry.delete(0, tk.END)
    blood_test_2_entry.delete(0, tk.END)
    messagebox.showinfo("성공", "기록이 저장되었습니다.")


# 기록 보기 함수
def view_records():
    records_window = tk.Toplevel()
    records_window.title("고양이 활동 및 건강 기록")

    with open(FILE_PATH, mode='r') as file:
        reader = csv.reader(file)
        for i, row in enumerate(reader):
            if i == 0:
                continue
            record_label = tk.Label(records_window,
                                    text=f"날짜: {row[0]}, 이름: {row[1]}, 몸무게: {row[2]}kg, 사료 섭취: {row[3]}g, 배변: {row[4]}회, 놀이 시간: {row[5]}분, 수면 시간: {row[6]}시간, 혈액검사 1: {row[7]}, 혈액검사 2: {row[8]}")
            record_label.pack()


# 달력에서 기록 확인하는 함수
def view_calendar():
    calendar_window = tk.Toplevel()
    calendar_window.title("고양이 기록 달력")

    cal = Calendar(calendar_window, selectmode='day', year=2024, month=9, day=20)
    cal.pack(pady=20)

    def show_selected():
        selected_date = cal.get_date()
        records_window = tk.Toplevel(calendar_window)
        records_window.title(f"{selected_date} 기록")

        with open(FILE_PATH, mode='r') as file:
            reader = csv.reader(file)
            for i, row in enumerate(reader):
                if i == 0 or row[0] != selected_date:
                    continue
                record_label = tk.Label(records_window,
                                        text=f"날짜: {row[0]}, 이름: {row[1]}, 몸무게: {row[2]}kg, 사료 섭취: {row[3]}g, 배변: {row[4]}회, 놀이 시간: {row[5]}분, 수면 시간: {row[6]}시간, 혈액검사 1: {row[7]}, 혈액검사 2: {row[8]}")
                record_label.pack()

    tk.Button(calendar_window, text="기록 보기", command=show_selected).pack()


# 혈액검사 그래프 표시 함수
def show_health_graph():
    dates = []
    blood_test_1 = []
    blood_test_2 = []

    with open(FILE_PATH, mode='r') as file:
        reader = csv.reader(file)
        for i, row in enumerate(reader):
            if i == 0:
                continue
            dates.append(row[0])
            blood_test_1.append(float(row[7]) if row[7] else None)
            blood_test_2.append(float(row[8]) if row[8] else None)

    if not dates or not any(blood_test_1) or not any(blood_test_2):
        messagebox.showwarning("데이터 없음", "기록된 혈액검사 데이터가 없습니다.")
        return

    plt.plot(dates, blood_test_1, marker='o', label='혈액검사 1')
    plt.plot(dates, blood_test_2, marker='o', label='혈액검사 2')
    plt.xlabel('날짜')
    plt.ylabel('수치')
    plt.title('혈액검사 수치 변화')
    plt.xticks(rotation=45)
    plt.legend()
    plt.tight_layout()
    plt.show()


# GUI 설정
root = tk.Tk()
root.title("고양이 활동 및 건강 관리")

# 입력창과 버튼
name_label = tk.Label(root, text="고양이 이름:")
name_label.pack()

name_entry = tk.Entry(root)
name_entry.pack()

weight_label = tk.Label(root, text="몸무게 (kg):")
weight_label.pack()

weight_entry = tk.Entry(root)
weight_entry.pack()

meal_grams_label = tk.Label(root, text="사료 섭취량 (g):")
meal_grams_label.pack()

meal_grams_entry = tk.Entry(root)
meal_grams_entry.pack()

litter_label = tk.Label(root, text="배변 횟수:")
litter_label.pack()

litter_entry = tk.Entry(root)
litter_entry.pack()

play_label = tk.Label(root, text="놀이 시간 (분):")
play_label.pack()

play_entry = tk.Entry(root)
play_entry.pack()

sleep_label = tk.Label(root, text="수면 시간 (시간):")
sleep_label.pack()

sleep_entry = tk.Entry(root)
sleep_entry.pack()

blood_test_1_label = tk.Label(root, text="혈액검사 1:")
blood_test_1_label.pack()

blood_test_1_entry = tk.Entry(root)
blood_test_1_entry.pack()

blood_test_2_label = tk.Label(root, text="혈액검사 2:")
blood_test_2_label.pack()

blood_test_2_entry = tk.Entry(root)
blood_test_2_entry.pack()

save_button = tk.Button(root, text="기록 저장", command=save_record)
save_button.pack()

view_button = tk.Button(root, text="기록 보기", command=view_records)
view_button.pack()

calendar_button = tk.Button(root, text="달력에서 기록 보기", command=view_calendar)
calendar_button.pack()

health_graph_button = tk.Button(root, text="혈액검사 그래프 보기", command=show_health_graph)
health_graph_button.pack()

root.mainloop()