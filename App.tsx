
import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_STUDENTS, GROUPS } from './mockData';
import { Payment, Student, PaymentStatus, DashboardStats, GroupStats, GroupName } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GroupsView from './components/GroupsView';
import PaymentsView from './components/PaymentsView';
import StudentsView from './components/StudentsView';
import SettingsView from './components/SettingsView';
import AddPaymentModal from './components/AddPaymentModal';

// Optional Firebase imports
import { collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db, isFirebaseConfigured } from './firebase';

type View = 'dashboard' | 'payments' | 'groups' | 'students' | 'reports' | 'settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [students] = useState<Student[]>(INITIAL_STUDENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync with Firestore or fallback to LocalStorage
  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      console.warn("Firebase not configured. Using local storage.");
      const saved = localStorage.getItem('class_payments');
      if (saved) setPayments(JSON.parse(saved));
      setIsLoading(false);
      return;
    }

    try {
      const q = query(collection(db, "payments"), orderBy("date", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const p: Payment[] = [];
        querySnapshot.forEach((doc) => {
          p.push({ id: doc.id, ...doc.data() } as Payment);
        });
        setPayments(p);
        setIsLoading(false);
      }, (error) => {
        console.error("Firestore Error:", error);
        setIsLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Firebase Error:", e);
      setIsLoading(false);
    }
  }, []);

  // Update Local storage as backup
  useEffect(() => {
    if (payments.length > 0) {
      localStorage.setItem('class_payments', JSON.stringify(payments));
    }
  }, [payments]);

  const stats: DashboardStats = useMemo(() => {
    const paidPayments = payments.filter(p => p.status === PaymentStatus.PAID);
    const totalCollected = paidPayments.reduce((acc, p) => acc + p.amount, 0);
    const uniquePaidStudents = new Set(paidPayments.map(p => p.studentId));
    
    const groupStats: GroupStats[] = GROUPS.map(group => {
      const groupPaid = payments
        .filter(p => p.group === group && p.status === PaymentStatus.PAID)
        .reduce((acc, p) => acc + p.amount, 0);
      
      const studentsInGroup = students.filter(s => s.group === group);
      
      return {
        name: group,
        totalPaid: groupPaid,
        studentCount: studentsInGroup.length,
        paidCount: new Set(payments.filter(p => p.group === group && p.status === PaymentStatus.PAID).map(p => p.studentId)).size,
        target: studentsInGroup.length * 25
      };
    });

    const targetAmount = students.length * 25;

    return {
      totalCollected,
      targetAmount,
      studentsPaid: uniquePaidStudents.size,
      totalStudents: students.length,
      remainingBalance: targetAmount - totalCollected,
      recentTransactions: payments.slice(0, 10),
      groupStats
    };
  }, [payments, students]);

  const handleAddPayment = async (newPayment: Omit<Payment, 'id'>) => {
    if (isFirebaseConfigured && db) {
      try {
        await addDoc(collection(db, "payments"), newPayment);
      } catch (e) {
        console.warn("Adding to Firestore failed, falling back to local state", e);
      }
    } else {
      const paymentWithId: Payment = {
        ...newPayment,
        id: `local-${Date.now()}`
      };
      setPayments(prev => [paymentWithId, ...prev]);
    }
    setIsModalOpen(false);
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-secondary text-sm animate-pulse">Establishing secure connection...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard stats={stats} onAddPayment={() => setIsModalOpen(true)} />;
      case 'groups':
        return <GroupsView stats={stats.groupStats} totalCollection={stats.totalCollected} />;
      case 'payments':
        return <PaymentsView payments={payments} onAddPayment={() => setIsModalOpen(true)} />;
      case 'students':
        return <StudentsView students={students} payments={payments} />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-20 text-center">
            <span className="material-symbols-outlined text-6xl mb-4">analytics</span>
            <h2 className="text-xl font-bold">Financial Reports</h2>
            <p className="max-w-xs mx-auto">Detailed charts and group-wise analytic reports are coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#f9fafa] overflow-hidden font-sans">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header viewTitle={currentView.charAt(0).toUpperCase() + currentView.slice(1)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {renderView()}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <AddPaymentModal 
          students={students} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleAddPayment} 
        />
      )}
    </div>
  );
};

export default App;
