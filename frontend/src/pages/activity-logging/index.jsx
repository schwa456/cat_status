import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Icon } from '../../components/AppIcon';

const ActivityLogging = () => {
  const [weight, setWeight] = useState('');
  const [urineCount, setUrineCount] = useState('');
  const [stoolCount, setStoolCount] = useState('');
  const [vomitCount, setVomitCount] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [playTime, setPlayTime] = useState('');
  const [mealAmount, setMealAmount] = useState('');
  const [notes, setNotes] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    const activityData = {
      weight,
      urineCount,
      stoolCount,
      vomitCount,
      sleepTime,
      playTime,
      mealAmount,
      notes,
    }
    console.log('Activity Logged: ', activityData);
    //TODO: API 호출 혹은 상태 업데이트 로직 추가
  };

  return (
      <>
        <Helmet>
          <title> 빠른 입력 - 고양이 건강 기록장 </title>
          <meta name="description" content="고양이의 활동을 빠르게 기록합니다."/>
        </Helmet>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">빠른 입력</h2>

            <div className="grid gird-cols-1 gap-4">
              {/* 몸무게 */}
              <div className="flex items-end space-x-2">
                <Input
                  id="weight"
                  label="체중 (kg)"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="예: 4.5"
                  className="flex-grow"
                />
                <span className="text-sm text-gray-600 mb-2">kg</span>
              </div>

              {/* 소변 횟수 */}
              <div className="flex items-end space-x-2">
                <Input
                  id="urineCount"
                  label="소변 횟수"
                  type="number"
                  value={urineCount}
                  onChange={(e) => setUrineCount(e.target.value)}
                  placeholder="예: 3"
                  className="flex-grow"
                />
                <span className="text-sm text-gray-600 mb-2">회</span>
              </div>

              {/* 대변 횟수 */}
              <div className="flex items-end space-x-2">
                <Input
                  id="stoolCount"
                  label="대변 횟수"
                  type="number"
                  value={stoolCount}
                  onChange={(e) => setStoolCount(e.target.value)}
                  placeholder="예: 2"
                  className="flex-grow"
                />
                <span className="text-sm text-gray-600 mb-2">회</span>
              </div>

              {/* 구토 횟수 */}
              <div className="flex items-end space-x-2">
                <Input
                  id="vomitCount"
                  label="구토 횟수"
                  type="number"
                  value={vomitCount}
                  onChange={(e) => setVomitCount(e.target.value)}
                  placeholder="예: 2"
                  className="flex-grow"
                />
                <span className="text-sm text-gray-600 mb-2">회</span>
              </div>

              {/* 수면 시간 */}
              <div className="flex items-end space-x-2">
                <Input
                  id="sleepTime"
                  label="수면 시간"
                  type="number"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  placeholder="예: 30"
                  className="flex-grow"
                />
                <span className="text-sm text-gray-600 mb-2">분</span>
              </div>

              {/* 놀이 시간 */}
              <div className="flex items-end space-x-2">
                <Input
                  id="playTime"
                  label="놀이 시간"
                  type="number"
                  value={playTime}
                  onChange={(e) => setPlayTime(e.target.value)}
                  placeholder="예: 30"
                  className="flex-grow"
                />
                <span className="text-sm text-gray-600 mb-2">분</span>
              </div>

              {/* 식사량 */}
              <div className="flex items-end space-x-2">
                <Input
                  id="mealAmount"
                  label="식사량(g)"
                  type="number"
                  value={mealAmount}
                  onChange={(e) => setMealAmount(e.target.value)}
                  placeholder="예: 30"
                  className="flex-grow"
                />
                <span className="text-sm text-gray-600 mb-2">g</span>
              </div>

              {/* 특이 사항 */}
              <div className="flex items-end space-x-2">
                <Input
                  id="notes"
                  label="특이 사항"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="특이사항을 입력하세요."
                />
              </div>

            </div>

            <Button type="submit" fullWidth>
              입력하기
            </Button>
          </form>
        </Card>

        <div className="mt-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4">최근 일주일 요약</h2>
            <div className="grid grid-cols-3 gap-4 text-center">

              <div>
                {/* 몸무게 아이콘 */}
                <Icon name="Scale" size={32} className="mx-auto mb-2 text-blue-500" />
                <p className="text-xl font-semibold text-gray-800">5.2kg</p>
                <p className="text-xs text-gray-500">몸무게</p>
              </div>

              <div>
                {/* 소변 아이콘 */}
                <Icon name="Droplet" size={32} className="mx-auto mb-2 text-blue-500" />
                <p className="text-xl font-semibold text-gray-800">21회</p>
                <p className="text-xs text-gray-500">소변 횟수</p>
              </div>

              <div>
                {/* 대변 아이콘 */}
                <Icon name="Feather" size={32} className="mx-auto mb-2 text-blue-500" />
                <p className="text-xl font-semibold text-gray-800">14회</p>
                <p className="text-xs text-gray-500">대변 횟수</p>
              </div>
            </div>
          </Card>
        </div>
      </>
  );
}

export default ActivityLogging;