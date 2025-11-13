import React from "react";
import { Helmet } from "react-helmet";
import Card from '../../components/ui/Card'
import { Icon } from '../../components/AppIcon'
import WeightTrendChart from './components/WeightTrendChart'
import BathroomChart from "./components/BathroomChart";

const ActivityReportsAnalytics = () => {
  // TODO: 차트 데이터 로딩 및 상태 관리 로직 추가

  return (
      <>
        <Helmet>
          <title>차트 - 고양이 건강 기록장</title>
          <meta name="description" content="고양이의 체중 변화와 활동량을 시각화한 차트 페이지입니다." />
        </Helmet>

        <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text=hray-800">몸무게 변화 추이</h3>
              <button className="p-2 text-gray-500 hover:text-gray-800">
                <Icon name="Download" size={20} />
              </button>
            </div>

            <div>
              <WeightTrendChart />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">현재 몸무게</p>
                <p className="text-2xl font-bold text-gray-800">5.67kg</p>
                <p className="text-sm text-green-600">+0.23kg</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">배변 활동 추이</h3>
              <button className="p-2 text-gray-500 hover:text-gray-800">
                <Icon name="Download" size={20} />
              </button>
            </div>
            <div>
              <BathroomChart />
            </div>
          </Card>
        </div>
      </>
  );
};

export default ActivityReportsAnalytics;