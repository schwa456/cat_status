import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import { Icon } from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

import HealthRecordCard from "./components/HealthRecordCard";
import AddHealthRecordModal from "./components/AddHealthRecordModal";
import HealthRecordFilters from "./components/HealthRecordFilters";
import HealthTrendsChart from "./components/HealthTrendsChart";
import HealthRecordDetailModal from "./components/HealthRecordDetailModal";
import healthRecordFilters from "./components/HealthRecordFilters";

const HealthRecordsTestResults = () => {
  const location = useLocation();
  const [selectedCat, setSelectedCat] = useState(null);
  const [isAddModelOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    priority: 'all',
    sortBy: 'date-desc',
    dateFrom: '',
    dateTo: '',
    veterinarian: '',
    showAbnormalOnly: false,
    hasAttachments: false,
    upcomingVaccinations: false,
  });

  const mockCats = [
    { id: 1, name: 'Whiskers', photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', lastActivity: '2 hours ago' },
    { id: 2, name: 'Luna', photo: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400', lastActivity: '4 hours ago' },
    { id: 3, name: 'Shadow', photo: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400', lastActivity: '1 day ago' }
  ];

   const mockHealthRecords = [
    {
      id: 1,
      catId: 1,
      catName: 'Whiskers',
      type: 'blood-work',
      title: 'Annual Blood Panel',
      date: new Date('2024-08-10T10:30:00'),
      summary: 'Comprehensive blood work showing elevated glucose levels requiring monitoring',
      description: `Complete blood chemistry panel performed during annual wellness exam. Results show most values within normal ranges with some concerns regarding glucose levels that require dietary management and follow-up testing.`,
      veterinarian: 'Dr. Sarah Johnson, City Veterinary Clinic',
      priority: 'medium',
      notes: 'Recommend switching to prescription diet food and recheck in 3 months. Owner advised to monitor water consumption and urination frequency.',
      testResults: [
        { id: 1, name: 'Glucose', value: '145', unit: 'mg/dL', normalRange: '70-140', status: 'high', trend: 'up' },
        { id: 2, name: 'Total Protein', value: '6.8', unit: 'g/dL', normalRange: '5.4-7.8', status: 'normal' },
        { id: 3, name: 'White Blood Cells', value: '12.5', unit: 'K/μL', normalRange: '5.5-19.5', status: 'normal' },
        { id: 4, name: 'Red Blood Cells', value: '7.2', unit: 'M/μL', normalRange: '5.0-10.0', status: 'normal' },
        { id: 5, name: 'Creatinine', value: '1.4', unit: 'mg/dL', normalRange: '0.8-2.4', status: 'normal' },
        { id: 6, name: 'BUN', value: '28', unit: 'mg/dL', normalRange: '16-36', status: 'normal' }
      ],
      attachments: [
        { name: 'Blood_Work_Results_Aug_2024.pdf', size: '245 KB', type: 'PDF' },
        { name: 'Lab_Report_Summary.pdf', size: '180 KB', type: 'PDF' }
      ],
      hasAttachments: true,
      createdAt: new Date('2024-08-10T10:30:00')
    },
    {
      id: 2,
      catId: 1,
      catName: 'Whiskers',
      type: 'vaccination',
      title: 'FVRCP Booster Vaccination',
      date: new Date('2024-07-15T14:00:00'),
      summary: 'Annual FVRCP vaccination administered successfully with no adverse reactions',
      description: 'Feline Viral Rhinotracheitis, Calicivirus, and Panleukopenia vaccination given as part of routine preventive care schedule.',
      veterinarian: 'Dr. Michael Chen, Paws & Claws Animal Hospital',
      priority: 'low',
      notes: 'Cat tolerated vaccination well. No immediate reactions observed. Next vaccination due in 12 months.',
      vaccineDetails: {
        type: 'FVRCP (Feline Distemper)',
        batchNumber: 'FV2024-0715-B',
        nextDue: '2025-07-15'
      },
      attachments: [],
      hasAttachments: false,
      createdAt: new Date('2024-07-15T14:00:00')
    },
    {
      id: 3,
      catId: 2,
      catName: 'Luna',
      type: 'vet-visit',
      title: 'Routine Wellness Examination',
      date: new Date('2024-08-05T11:15:00'),
      summary: 'Annual wellness exam with dental cleaning recommendation',
      description: `Comprehensive physical examination including weight check, dental assessment, heart and lung auscultation, abdominal palpation, and joint mobility evaluation. Overall health status is good with minor dental tartar buildup noted.`,
      veterinarian: 'Dr. Emily Rodriguez, Companion Animal Clinic',
      priority: 'low',
      notes: 'Weight stable at 12.3 lbs. Recommend dental cleaning within next 6 months. Continue current diet and exercise routine.',
      attachments: [
        { name: 'Wellness_Exam_Report_Luna.pdf', size: '320 KB', type: 'PDF' }
      ],
      hasAttachments: true,
      createdAt: new Date('2024-08-05T11:15:00')
    },
    {
      id: 4,
      catId: 1,
      catName: 'Whiskers',
      type: 'medication',
      title: 'Antibiotic Treatment for UTI',
      date: new Date('2024-06-20T16:45:00'),
      summary: 'Prescribed amoxicillin for urinary tract infection treatment',
      description: 'Urinary tract infection diagnosed based on clinical symptoms and urinalysis results. Antibiotic therapy prescribed with follow-up urinalysis recommended.',
      veterinarian: 'Dr. Sarah Johnson, City Veterinary Clinic',
      priority: 'high',
      notes: 'Complete full course of antibiotics even if symptoms improve. Monitor for increased water consumption and frequent urination. Return if symptoms persist or worsen.',
      medicationDetails: {
        name: 'Amoxicillin',
        dosage: '62.5mg',
        frequency: 'Twice daily (every 12 hours)',
        duration: '10 days'
      },
      attachments: [],
      hasAttachments: false,
      createdAt: new Date('2024-06-20T16:45:00')
    },
    {
      id: 5,
      catId: 3,
      catName: 'Shadow',
      type: 'symptom',
      title: 'Decreased Appetite and Lethargy',
      date: new Date('2024-08-12T09:30:00'),
      summary: 'Owner reported 3-day history of reduced food intake and increased sleeping',
      description: `Owner reports Shadow has been eating approximately 50% of normal food intake for the past 3 days. Also noted increased sleeping and less interest in play activities. No vomiting or diarrhea observed.`,
      veterinarian: 'Dr. Robert Kim, Neighborhood Pet Care',
      priority: 'medium',
      notes: 'Scheduled follow-up examination if symptoms persist beyond 5 days. Monitor food and water intake closely. Contact clinic immediately if vomiting or diarrhea develops.',
      attachments: [],
      hasAttachments: false,
      createdAt: new Date('2024-08-12T09:30:00')
    },
    {
      id: 6,
      catId: 2,
      catName: 'Luna',
      type: 'blood-work',
      title: 'Pre-Surgical Blood Panel',
      date: new Date('2024-05-28T08:00:00'),
      summary: 'Pre-anesthetic blood work prior to dental cleaning procedure',
      description: 'Comprehensive blood chemistry and complete blood count performed to assess anesthetic risk prior to scheduled dental cleaning procedure.',
      veterinarian: 'Dr. Emily Rodriguez, Companion Animal Clinic',
      priority: 'low',
      notes: 'All values within normal limits. Cleared for anesthesia and dental procedure. Surgery scheduled for following week.',
      testResults: [
        { id: 1, name: 'Glucose', value: '95', unit: 'mg/dL', normalRange: '70-140', status: 'normal' },
        { id: 2, name: 'Total Protein', value: '6.2', unit: 'g/dL', normalRange: '5.4-7.8', status: 'normal' },
        { id: 3, name: 'White Blood Cells', value: '8.9', unit: 'K/μL', normalRange: '5.5-19.5', status: 'normal' },
        { id: 4, name: 'Creatinine', value: '1.1', unit: 'mg/dL', normalRange: '0.8-2.4', status: 'normal' }
      ],
      attachments: [
        { name: 'Pre_Surgical_Bloodwork_Luna.pdf', size: '198 KB', type: 'PDF' }
      ],
      hasAttachments: true,
      createdAt: new Date('2024-05-28T08:00:00')
    }
  ];

  useEffect(() => {
    // Set Default Selected Cat
    if (mockCats?.length > 0 && !selectedCat){
      setSelectedCat(mockCats[0]);
    }
    
    // Set mock health records
    setHealthRecords(mockHealthRecords);
    
    const urlParams = new URLSearchParams(location.search);
    if (urlParams?.get('action') === 'new') {
      setIsAddModalOpen(true);
    } 
  }, [location.search, mockCats, mockHealthRecords, selectedCat]);

const filteredRecords = healthRecords?.filter(record => {
    // Filter by selected cat
    if (selectedCat && record?.catId !== selectedCat?.id) return false;

    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      if (!record?.title?.toLowerCase()?.includes(searchTerm) &&
          !record?.summary?.toLowerCase()?.includes(searchTerm) &&
          !record?.description?.toLowerCase()?.includes(searchTerm) &&
          !record?.veterinarian?.toLowerCase()?.includes(searchTerm)) {
        return false;
      }
    }

    // Type filter
    if (filters?.type !== 'all' && record?.type !== filters?.type) return false;

    // Priority filter
    if (filters?.priority !== 'all' && record?.priority !== filters?.priority) return false;

    // Date range filter
    if (filters?.dateFrom) {
      const recordDate = new Date(record.date);
      const fromDate = new Date(filters.dateFrom);
      if (recordDate < fromDate) return false;
    }

    if (filters?.dateTo) {
      const recordDate = new Date(record.date);
      const toDate = new Date(filters.dateTo);
      toDate?.setHours(23, 59, 59, 999); // End of day
      if (recordDate > toDate) return false;
    }

    // Veterinarian filter
    if (filters?.veterinarian) {
      const vetTerm = filters?.veterinarian?.toLowerCase();
      if (!record?.veterinarian?.toLowerCase()?.includes(vetTerm)) return false;
    }

    // Abnormal results filter
    if (filters?.showAbnormalOnly) {
      if (record?.type !== 'blood-work' || !record?.testResults) return false;
      const hasAbnormal = record?.testResults?.some(test => test?.status !== 'normal');
      if (!hasAbnormal) return false;
    }

    // Has attachments filter
    if (filters?.hasAttachments && !record?.hasAttachments) return false;

    // Upcoming vaccinations filter
    if (filters?.upcomingVaccinations) {
      if (record?.type !== 'vaccination' || !record?.vaccineDetails?.nextDue) return false;
      const nextDue = new Date(record.vaccineDetails.nextDue);
      const now = new Date();
      const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
      if (nextDue > thirtyDaysFromNow) return false;
    }

    return true;
  })?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'type':
        return a?.type?.localeCompare(b?.type);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const handleAddRecord = (record) => {
    setHealthRecords(prev => [record, ...prev]);
  };

  const hadleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  return (
      <>
        <Helmet>
          <title>건강 기록 및 검사 결과 - 고양이 건강 기록장</title>
          <meta name="description" content="고양이의 건강 기록과 검사 결과를 관리하고 시각화하는 페이지입니다." />
        </Helmet>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">혈액 검사 결과 입력하기</h3>
            <div className="flex flex-col space-y-3">
              <Button fullWidth onClick={() => setIsAddModalOpen(true)}>
                직접 입력
              </Button>
              <Button fullWidth variant="outline">
                검사 결과 파일 업로드
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="text=lg font-bold text-gray-800 mb-4">최근 혈액검사 결과</h3>
            <div className="space-y-3">
              {filteredRecords?.length > 0 ? (
                  filteredRecords?.slice(0, 3)?.map((record) => (
                      <HealthRecordCard
                        key={record?.id}
                        record={record}
                        onViewDetails={hadleViewDetails}
                      />
                  ))
                ) : (
                    <p className="text-gray-500 text-center">기록된 혈액검사 결과가 없습니다.</p>
                )}
            </div>
            {filteredRecords?.length > 3 && (
                <div className="mt-4 text-center">
                  <Button variant="link">모든 기록 보기</Button>
                </div>
            )}
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">최근 혈액검사 세부 결과 - CBC - RBC</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">최근 검사 일자: 25. 9. 9.</p>
              <p className="text-sm text-gray-700">최근 검사 병원: 조이 동물 병원</p>
              <p className="text-sm font-semibold text-gray-800 mt-4">최근 검사 결과(종합 소견)</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li> 올해 안으로 스케일링, 치과 탐사선 치료 진행</li>
                <li>아조탈 복용 시작, 신장 그랜드 검진으로 재평가</li>
                <li>미세 단백뇨/혈압/sdma/GF(조기출검사)</li>
              </ul>
            </div>
          </Card>
        </div>

        <AddHealthRecordModal
          isOpen={isAddModelOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedRecord(null);
          }}
          onSave={handleAddRecord}
          selectedCat={selectedCat}
          editRecord={selectedRecord}
        />

        <HealthRecordDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedRecord(null);
          }}
          record={selectedRecord}
        />
      </>
  );
};

export default HealthRecordsTestResults