import React, { useState, useEffect } from 'react';
import { 
  Home, Dumbbell, Utensils, BarChart3, Settings, 
  ChevronRight, Plus, Minus, Check, Clock, Trophy,
  Calendar, TrendingUp, Target, User, Apple, Flame
} from 'lucide-react';

// ═══════════════════════════════════════
// 📦 بيانات التمارين لكل نظام
// ═══════════════════════════════════════

const WORKOUT_DATA = {
  PPL: {
    push: [
      { id: 'bench', name: 'Bench Press', nameAr: 'بنش برس' },
      { id: 'incline', name: 'Incline Dumbbell Press', nameAr: 'دمبل مايل' },
      { id: 'shoulder', name: 'Shoulder Press', nameAr: 'كتف' },
      { id: 'lateral', name: 'Lateral Raises', nameAr: 'رفرفة جانبي' },
      { id: 'tricep-push', name: 'Tricep Pushdown', nameAr: 'ترايسبس بار' },
      { id: 'tricep-ext', name: 'Overhead Tricep Extension', nameAr: 'فرنساوي' }
    ],
    pull: [
      { id: 'deadlift', name: 'Deadlift', nameAr: 'ديدلفت' },
      { id: 'pullups', name: 'Pull-ups', nameAr: 'عقلة' },
      { id: 'barbell-row', name: 'Barbell Row', nameAr: 'سحب بار' },
      { id: 'lat-pull', name: 'Lat Pulldown', nameAr: 'سحب أمامي' },
      { id: 'db-curl', name: 'Dumbbell Curl', nameAr: 'بايسبس دمبل' },
      { id: 'hammer', name: 'Hammer Curl', nameAr: 'مطرقة' }
    ],
    legs: [
      { id: 'squat', name: 'Squat', nameAr: 'سكوات' },
      { id: 'leg-press', name: 'Leg Press', nameAr: 'ليج برس' },
      { id: 'romanian', name: 'Romanian Deadlift', nameAr: 'ديدلفت روماني' },
      { id: 'leg-curl', name: 'Leg Curl', nameAr: 'رجل خلفي' },
      { id: 'leg-ext', name: 'Leg Extension', nameAr: 'رجل أمامي' },
      { id: 'calf', name: 'Calf Raises', nameAr: 'سمانة' },
      { id: 'abs', name: 'Abs Exercises', nameAr: 'بطن' }
    ]
  },
  UpperLower: {
    upper: [
      { id: 'bench', name: 'Bench Press', nameAr: 'بنش برس' },
      { id: 'barbell-row', name: 'Barbell Row', nameAr: 'سحب بار' },
      { id: 'shoulder', name: 'Shoulder Press', nameAr: 'كتف' },
      { id: 'pullups', name: 'Pull-ups', nameAr: 'عقلة' },
      { id: 'db-curl', name: 'Dumbbell Curls', nameAr: 'بايسبس دمبل' },
      { id: 'tricep-dips', name: 'Tricep Dips', nameAr: 'متوازي' }
    ],
    lower: [
      { id: 'squat', name: 'Squat', nameAr: 'سكوات' },
      { id: 'deadlift', name: 'Deadlift', nameAr: 'ديدلفت' },
      { id: 'leg-press', name: 'Leg Press', nameAr: 'ليج برس' },
      { id: 'lunges', name: 'Lunges', nameAr: 'طعنات' },
      { id: 'leg-curl', name: 'Leg Curl', nameAr: 'رجل خلفي' },
      { id: 'calf', name: 'Calf Raises', nameAr: 'سمانة' }
    ]
  }
};

// قاعدة بيانات الأطعمة الشائعة
const FOOD_DATABASE = [
  { id: 1, name: 'أرز أبيض (كوب)', calories: 200, protein: 4, carbs: 45, fats: 0.5 },
  { id: 2, name: 'صدر دجاج (100جم)', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  { id: 3, name: 'بيضة كاملة', calories: 70, protein: 6, carbs: 0.5, fats: 5 },
  { id: 4, name: 'خبز أسمر (شريحة)', calories: 80, protein: 4, carbs: 15, fats: 1 },
  { id: 5, name: 'لبن (كوب)', calories: 150, protein: 8, carbs: 12, fats: 8 },
  { id: 6, name: 'موز (حبة)', calories: 105, protein: 1.3, carbs: 27, fats: 0.4 },
  { id: 7, name: 'تفاح (حبة)', calories: 95, protein: 0.5, carbs: 25, fats: 0.3 },
  { id: 8, name: 'لوز (30جم)', calories: 170, protein: 6, carbs: 6, fats: 15 },
  { id: 9, name: 'شوفان (نصف كوب)', calories: 150, protein: 5, carbs: 27, fats: 3 },
  { id: 10, name: 'لحم بقري (100جم)', calories: 250, protein: 26, carbs: 0, fats: 17 },
  { id: 11, name: 'سمك سلمون (100جم)', calories: 206, protein: 22, carbs: 0, fats: 13 },
  { id: 12, name: 'بطاطس مسلوقة (حبة)', calories: 130, protein: 3, carbs: 30, fats: 0.2 },
  { id: 13, name: 'بروتين باودر (سكوب)', calories: 120, protein: 24, carbs: 3, fats: 1.5 },
  { id: 14, name: 'زبدة فول سوداني (ملعقة)', calories: 95, protein: 4, carbs: 3.5, fats: 8 },
  { id: 15, name: 'جبنة قريش (100جم)', calories: 98, protein: 11, carbs: 3, fats: 4 }
];

// ═══════════════════════════════════════
// 🎯 المكون الرئيسي للتطبيق
// ═══════════════════════════════════════

export default function GymTrackerApp() {
  // حالات التنقل والعرض
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [workoutSystem, setWorkoutSystem] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  
  // بيانات المستخدم والتمارين
  const [userProfile, setUserProfile] = useState({
    name: 'البطل',
    weight: 75,
    height: 175,
    age: 25,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'bulking'
  });
  
  const [workouts, setWorkouts] = useState([]);
  const [currentSets, setCurrentSets] = useState([]);
  const [meals, setMeals] = useState([]);
  const [dailyGoals, setDailyGoals] = useState({
    calories: 2500,
    protein: 150,
    carbs: 300,
    fats: 70
  });
  
  // مؤقت الراحة
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);

  // ═══════════════════════════════════════
  // 💾 حفظ واستعادة البيانات من localStorage
  // ═══════════════════════════════════════
  
  useEffect(() => {
    const saved = localStorage.getItem('gymTrackerData');
    if (saved) {
      const data = JSON.parse(saved);
      setUserProfile(data.userProfile || userProfile);
      setWorkouts(data.workouts || []);
      setMeals(data.meals || []);
      setDailyGoals(data.dailyGoals || dailyGoals);
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      userProfile,
      workouts,
      meals,
      dailyGoals
    };
    localStorage.setItem('gymTrackerData', JSON.stringify(dataToSave));
  }, [userProfile, workouts, meals, dailyGoals]);

  // مؤقت الراحة
  useEffect(() => {
    let interval;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  // ═══════════════════════════════════════
  // 🧮 حساب الاحتياجات الغذائية
  // ═══════════════════════════════════════
  
  const calculateDailyGoals = () => {
    const { weight, height, age, gender, activityLevel, goal } = userProfile;
    
    // حساب BMR باستخدام معادلة Mifflin-St Jeor
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // معامل النشاط
    const activityMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      athlete: 1.9
    };
    
    let tdee = bmr * activityMultiplier[activityLevel];
    
    // تعديل حسب الهدف
    if (goal === 'cutting') tdee -= 500;
    else if (goal === 'bulking') tdee += 300;
    
    // حساب الماكروز
    const protein = weight * 2; // 2 جرام لكل كيلو
    const fats = weight * 0.8; // 0.8 جرام لكل كيلو
    const proteinCals = protein * 4;
    const fatsCals = fats * 9;
    const remainingCals = tdee - proteinCals - fatsCals;
    const carbs = remainingCals / 4;
    
    setDailyGoals({
      calories: Math.round(tdee),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats)
    });
  };

  // ═══════════════════════════════════════
  // 📊 حساب إحصائيات اليوم
  // ═══════════════════════════════════════
  
  const getTodayMeals = () => {
    const today = new Date().toDateString();
    return meals.filter(meal => new Date(meal.date).toDateString() === today);
  };

  const getTodayTotals = () => {
    const todayMeals = getTodayMeals();
    return todayMeals.reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  const getThisWeekWorkouts = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return workouts.filter(w => new Date(w.date) >= weekAgo);
  };

  // ═══════════════════════════════════════
  // 🏠 الصفحة الرئيسية (Dashboard)
  // ═══════════════════════════════════════
  
  const DashboardPage = () => {
    const todayTotals = getTodayTotals();
    const weekWorkouts = getThisWeekWorkouts();
    const lastWorkout = workouts[workouts.length - 1];
    
    return (
      <div className="space-y-6">
        {/* بطاقة الترحيب */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">مرحباً، {userProfile.name}! 💪</h1>
          <p className="text-blue-100">جاهز لتحطيم أهدافك اليوم؟</p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="text-orange-500" size={24} />
              <span className="text-gray-600 text-sm">تمارين هذا الأسبوع</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{weekWorkouts.length}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="text-red-500" size={24} />
              <span className="text-gray-600 text-sm">السعرات المتبقية</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {dailyGoals.calories - todayTotals.calories}
            </p>
          </div>
        </div>

        {/* آخر تمرين */}
        {lastWorkout && (
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-800">آخر تمرين</h3>
              <Calendar className="text-gray-400" size={20} />
            </div>
            <p className="text-gray-600">{lastWorkout.dayType}</p>
            <p className="text-sm text-gray-400">
              {new Date(lastWorkout.date).toLocaleDateString('ar-SA')}
            </p>
          </div>
        )}

        {/* أزرار سريعة */}
        <div className="space-y-3">
          <button
            onClick={() => setCurrentPage('workout')}
            className="w-full bg-blue-600 text-white rounded-xl p-4 font-bold flex items-center justify-between hover:bg-blue-700 transition"
          >
            <span>بدء تمرين جديد</span>
            <Dumbbell size={24} />
          </button>
          
          <button
            onClick={() => setCurrentPage('nutrition')}
            className="w-full bg-green-600 text-white rounded-xl p-4 font-bold flex items-center justify-between hover:bg-green-700 transition"
          >
            <span>إضافة وجبة</span>
            <Utensils size={24} />
          </button>
        </div>

        {/* ملخص التغذية اليومية */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="font-bold text-gray-800 mb-4">ملخص اليوم الغذائي</h3>
          
          <div className="space-y-3">
            <NutrientProgress
              label="السعرات"
              current={todayTotals.calories}
              target={dailyGoals.calories}
              color="blue"
              unit="سعر"
            />
            <NutrientProgress
              label="البروتين"
              current={todayTotals.protein}
              target={dailyGoals.protein}
              color="red"
              unit="جم"
            />
            <NutrientProgress
              label="الكربوهيدرات"
              current={todayTotals.carbs}
              target={dailyGoals.carbs}
              color="yellow"
              unit="جم"
            />
            <NutrientProgress
              label="الدهون"
              current={todayTotals.fats}
              target={dailyGoals.fats}
              color="purple"
              unit="جم"
            />
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════
  // 💪 صفحة التمارين
  // ═══════════════════════════════════════
  
  const WorkoutPage = () => {
    if (!workoutSystem) {
      return <WorkoutSystemSelector />;
    }
    
    if (!selectedDay) {
      return <DaySelector />;
    }
    
    if (!selectedExercise) {
      return <ExerciseList />;
    }
    
    return <ExerciseLogger />;
  };

  const WorkoutSystemSelector = () => (
    <div className="space-y-6">
      <div>
        <button 
          onClick={() => {
            setWorkoutSystem(null);
            setSelectedDay(null);
            setSelectedExercise(null);
          }}
          className="text-blue-600 flex items-center gap-2 mb-4"
        >
          ← العودة
        </button>
        <h2 className="text-2xl font-bold text-gray-800">اختر نظام التدريب</h2>
      </div>

      <div className="grid gap-4">
        <button
          onClick={() => setWorkoutSystem('PPL')}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-right"
        >
          <div className="flex items-center justify-between mb-3">
            <Dumbbell className="text-blue-600" size={40} />
            <ChevronRight className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Push / Pull / Legs</h3>
          <p className="text-gray-600 text-sm">نظام PPL - تقسيم 3 أيام</p>
          <p className="text-gray-500 text-xs mt-2">دفع، سحب، أرجل</p>
        </button>

        <button
          onClick={() => setWorkoutSystem('UpperLower')}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-right"
        >
          <div className="flex items-center justify-between mb-3">
            <Dumbbell className="text-green-600" size={40} />
            <ChevronRight className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Upper / Lower Split</h3>
          <p className="text-gray-600 text-sm">نظام علوي/سفلي - تقسيم يومين</p>
          <p className="text-gray-500 text-xs mt-2">جسم علوي، جسم سفلي</p>
        </button>
      </div>
    </div>
  );

  const DaySelector = () => {
    const days = workoutSystem === 'PPL' 
      ? [
          { id: 'push', name: 'Push Day', nameAr: 'يوم الدفع', desc: 'صدر، أكتاف، ترايسبس', color: 'blue' },
          { id: 'pull', name: 'Pull Day', nameAr: 'يوم السحب', desc: 'ظهر، بايسبس', color: 'green' },
          { id: 'legs', name: 'Legs Day', nameAr: 'يوم الأرجل', desc: 'أرجل، بطن', color: 'orange' }
        ]
      : [
          { id: 'upper', name: 'Upper Body', nameAr: 'جسم علوي', desc: 'صدر، ظهر، أكتاف، ذراعين', color: 'blue' },
          { id: 'lower', name: 'Lower Body', nameAr: 'جسم سفلي', desc: 'أرجل، سمانة', color: 'green' }
        ];

    return (
      <div className="space-y-6">
        <div>
          <button 
            onClick={() => setWorkoutSystem(null)}
            className="text-blue-600 flex items-center gap-2 mb-4"
          >
            ← العودة
          </button>
          <h2 className="text-2xl font-bold text-gray-800">اختر يوم التمرين</h2>
        </div>

        <div className="grid gap-4">
          {days.map(day => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-right border-r-4 border-${day.color}-500`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-800">{day.nameAr}</h3>
                <ChevronRight className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm">{day.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const ExerciseList = () => {
    const exercises = WORKOUT_DATA[workoutSystem][selectedDay];

    return (
      <div className="space-y-6">
        <div>
          <button 
            onClick={() => setSelectedDay(null)}
            className="text-blue-600 flex items-center gap-2 mb-4"
          >
            ← العودة
          </button>
          <h2 className="text-2xl font-bold text-gray-800">اختر التمرين</h2>
        </div>

        <div className="grid gap-3">
          {exercises.map(exercise => (
            <button
              key={exercise.id}
              onClick={() => {
                setSelectedExercise(exercise);
                setCurrentSets([{ reps: '', weight: '' }]);
              }}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition text-right flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-gray-800">{exercise.nameAr}</h3>
                <p className="text-sm text-gray-500">{exercise.name}</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const ExerciseLogger = () => {
    const addSet = () => {
      setCurrentSets([...currentSets, { reps: '', weight: '' }]);
    };

    const removeSet = (index) => {
      setCurrentSets(currentSets.filter((_, i) => i !== index));
    };

    const updateSet = (index, field, value) => {
      const newSets = [...currentSets];
      newSets[index][field] = value;
      setCurrentSets(newSets);
    };

    const calculateVolume = () => {
      return currentSets.reduce((total, set) => {
        const reps = parseInt(set.reps) || 0;
        const weight = parseFloat(set.weight) || 0;
        return total + (reps * weight);
      }, 0);
    };

    const completeExercise = () => {
      const workout = {
        id: Date.now(),
        date: new Date().toISOString(),
        system: workoutSystem,
        dayType: selectedDay,
        exercise: selectedExercise,
        sets: currentSets.filter(s => s.reps && s.weight),
        volume: calculateVolume()
      };

      setWorkouts([...workouts, workout]);
      
      // بدء مؤقت الراحة
      setRestTimer(90);
      setIsResting(true);
      
      // العودة لقائمة التمارين
      setSelectedExercise(null);
      setCurrentSets([]);
    };

    // الحصول على آخر 3 جلسات لهذا التمرين
    const previousSessions = workouts
      .filter(w => w.exercise.id === selectedExercise.id)
      .slice(-3)
      .reverse();

    return (
      <div className="space-y-6">
        <div>
          <button 
            onClick={() => setSelectedExercise(null)}
            className="text-blue-600 flex items-center gap-2 mb-4"
          >
            ← العودة
          </button>
          <h2 className="text-2xl font-bold text-gray-800">{selectedExercise.nameAr}</h2>
          <p className="text-gray-600">{selectedExercise.name}</p>
        </div>

        {/* مؤقت الراحة */}
        {isResting && (
          <div className="bg-orange-100 border-2 border-orange-500 rounded-xl p-4 text-center">
            <Clock className="mx-auto mb-2 text-orange-600" size={32} />
            <p className="text-xl font-bold text-orange-800">وقت الراحة</p>
            <p className="text-4xl font-bold text-orange-600 my-2">
              {Math.floor(restTimer / 60)}:{(restTimer % 60).toString().padStart(2, '0')}
            </p>
            <button
              onClick={() => {
                setIsResting(false);
                setRestTimer(0);
              }}
              className="text-orange-600 underline text-sm"
            >
              تخطي
            </button>
          </div>
        )}

        {/* الجلسات السابقة */}
        {previousSessions.length > 0 && (
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-bold text-blue-800 mb-3">آخر 3 جلسات</h3>
            <div className="space-y-2">
              {previousSessions.map((session, idx) => (
                <div key={session.id} className="text-sm text-blue-700">
                  <span className="font-bold">
                    {new Date(session.date).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
                  </span>
                  {' - '}
                  {session.sets.length} مجموعات
                  {' - '}
                  الحجم: {session.volume.toFixed(0)} كجم
                </div>
              ))}
            </div>
          </div>
        )}

        {/* المجموعات الحالية */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800">المجموعات</h3>
          
          {currentSets.map((set, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-600 font-bold">المجموعة {index + 1}</span>
                {currentSets.length > 1 && (
                  <button
                    onClick={() => removeSet(index)}
                    className="mr-auto text-red-500"
                  >
                    <Minus size={20} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">التكرارات</label>
                  <input
                    type="number"
                    value={set.reps}
                    onChange={(e) => updateSet(index, 'reps', e.target.value)}
                    placeholder="12"
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-center text-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">الوزن (كجم)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={set.weight}
                    onChange={(e) => updateSet(index, 'weight', e.target.value)}
                    placeholder="50"
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-center text-lg font-bold"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addSet}
            className="w-full border-2 border-dashed border-blue-400 text-blue-600 rounded-xl p-4 font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition"
          >
            <Plus size={20} />
            إضافة مجموعة
          </button>
        </div>

        {/* إجمالي الحجم */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white text-center">
          <p className="text-sm mb-1">إجمالي الحجم التدريبي</p>
          <p className="text-3xl font-bold">{calculateVolume().toFixed(0)} كجم</p>
        </div>

        {/* زر الإكمال */}
        <button
          onClick={completeExercise}
          disabled={!currentSets.some(s => s.reps && s.weight)}
          className="w-full bg-green-600 text-white rounded-xl p-4 font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Check size={24} />
          إكمال التمرين
        </button>
      </div>
    );
  };

  // ═══════════════════════════════════════
  // 🍽️ صفحة التغذية
  // ═══════════════════════════════════════
  
  const NutritionPage = () => {
    const [showCalculator, setShowCalculator] = useState(false);
    const [showFoodDB, setShowFoodDB] = useState(false);
    const [newMeal, setNewMeal] = useState({
      name: '',
      description: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: ''
    });

    const addMeal = () => {
      if (!newMeal.name || !newMeal.calories) return;
      
      const meal = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...newMeal,
        calories: parseFloat(newMeal.calories),
        protein: parseFloat(newMeal.protein) || 0,
        carbs: parseFloat(newMeal.carbs) || 0,
        fats: parseFloat(newMeal.fats) || 0
      };

      setMeals([...meals, meal]);
      setNewMeal({
        name: '',
        description: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
      });
      setShowFoodDB(false);
    };

    const addFromFoodDB = (food) => {
      setNewMeal({
        name: food.name,
        description: '',
        calories: food.calories.toString(),
        protein: food.protein.toString(),
        carbs: food.carbs.toString(),
        fats: food.fats.toString()
      });
      setShowFoodDB(false);
    };

    const todayTotals = getTodayTotals();
    const todayMeals = getTodayMeals();

    if (showCalculator) {
      return <NutritionCalculator onBack={() => setShowCalculator(false)} />;
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">التغذية</h2>
          <button
            onClick={() => setShowCalculator(true)}
            className="text-blue-600 text-sm flex items-center gap-1"
          >
            <Target size={16} />
            إعادة الحساب
          </button>
        </div>

        {/* الأهداف اليومية */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white text-center">
            <Flame size={24} className="mx-auto mb-1" />
            <p className="text-2xl font-bold">{dailyGoals.calories}</p>
            <p className="text-xs">سعر</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-3 text-white text-center">
            <p className="text-2xl font-bold">{dailyGoals.protein}</p>
            <p className="text-xs">بروتين</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-3 text-white text-center">
            <p className="text-2xl font-bold">{dailyGoals.carbs}</p>
            <p className="text-xs">كارب</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white text-center">
            <p className="text-2xl font-bold">{dailyGoals.fats}</p>
            <p className="text-xs">دهون</p>
          </div>
        </div>

        {/* التقدم اليومي */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="font-bold text-gray-800 mb-4">التقدم اليومي</h3>
          <div className="space-y-3">
            <NutrientProgress
              label="السعرات"
              current={todayTotals.calories}
              target={dailyGoals.calories}
              color="blue"
              unit="سعر"
            />
            <NutrientProgress
              label="البروتين"
              current={todayTotals.protein}
              target={dailyGoals.protein}
              color="red"
              unit="جم"
            />
            <NutrientProgress
              label="الكربوهيدرات"
              current={todayTotals.carbs}
              target={dailyGoals.carbs}
              color="yellow"
              unit="جم"
            />
            <NutrientProgress
              label="الدهون"
              current={todayTotals.fats}
              target={dailyGoals.fats}
              color="purple"
              unit="جم"
            />
          </div>
        </div>

        {/* قاعدة بيانات الأطعمة */}
        {showFoodDB && (
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-800">الأطعمة الشائعة</h3>
              <button onClick={() => setShowFoodDB(false)} className="text-gray-400">
                ✕
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {FOOD_DATABASE.map(food => (
                <button
                  key={food.id}
                  onClick={() => addFromFoodDB(food)}
                  className="w-full text-right p-3 rounded-lg hover:bg-gray-50 transition border border-gray-200"
                >
                  <div className="font-bold text-gray-800">{food.name}</div>
                  <div className="text-xs text-gray-500">
                    {food.calories} سعر | {food.protein}جم بروتين
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* إضافة وجبة */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="font-bold text-gray-800 mb-4">إضافة وجبة جديدة</h3>
          
          <button
            onClick={() => setShowFoodDB(!showFoodDB)}
            className="w-full mb-3 border-2 border-dashed border-green-400 text-green-600 rounded-lg p-3 text-sm hover:bg-green-50 transition"
          >
            📋 اختر من قاعدة البيانات
          </button>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">نوع الوجبة</label>
              <select
                value={newMeal.name}
                onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg p-3"
              >
                <option value="">اختر...</option>
                <option value="فطور">فطور</option>
                <option value="سناك صباحي">سناك صباحي</option>
                <option value="غداء">غداء</option>
                <option value="سناك مسائي">سناك مسائي</option>
                <option value="عشاء">عشاء</option>
                <option value="وجبة بعد التمرين">وجبة بعد التمرين</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">وصف الطعام</label>
              <input
                type="text"
                value={newMeal.description}
                onChange={(e) => setNewMeal({...newMeal, description: e.target.value})}
                placeholder="مثال: صدر دجاج مع أرز وخضار"
                className="w-full border-2 border-gray-300 rounded-lg p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">السعرات</label>
                <input
                  type="number"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                  placeholder="500"
                  className="w-full border-2 border-gray-300 rounded-lg p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">البروتين (جم)</label>
                <input
                  type="number"
                  value={newMeal.protein}
                  onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                  placeholder="40"
                  className="w-full border-2 border-gray-300 rounded-lg p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">الكارب (جم)</label>
                <input
                  type="number"
                  value={newMeal.carbs}
                  onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                  placeholder="60"
                  className="w-full border-2 border-gray-300 rounded-lg p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">الدهون (جم)</label>
                <input
                  type="number"
                  value={newMeal.fats}
                  onChange={(e) => setNewMeal({...newMeal, fats: e.target.value})}
                  placeholder="15"
                  className="w-full border-2 border-gray-300 rounded-lg p-3"
                />
              </div>
            </div>

            <button
              onClick={addMeal}
              className="w-full bg-green-600 text-white rounded-lg p-3 font-bold hover:bg-green-700 transition"
            >
              إضافة الوجبة
            </button>
          </div>
        </div>

        {/* قائمة الوجبات اليومية */}
        {todayMeals.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h3 className="font-bold text-gray-800 mb-4">وجبات اليوم ({todayMeals.length})</h3>
            <div className="space-y-3">
              {todayMeals.map(meal => (
                <div key={meal.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800">{meal.name}</span>
                    <button
                      onClick={() => setMeals(meals.filter(m => m.id !== meal.id))}
                      className="text-red-500 text-sm"
                    >
                      حذف
                    </button>
                  </div>
                  {meal.description && (
                    <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
                  )}
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>🔥 {meal.calories} سعر</span>
                    <span>🥩 {meal.protein}جم</span>
                    <span>🍚 {meal.carbs}جم</span>
                    <span>🥑 {meal.fats}جم</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const NutritionCalculator = ({ onBack }) => {
    const [formData, setFormData] = useState(userProfile);

    const handleCalculate = () => {
      setUserProfile(formData);
      calculateDailyGoals();
      onBack();
    };

    return (
      <div className="space-y-6">
        <div>
          <button onClick={onBack} className="text-blue-600 flex items-center gap-2 mb-4">
            ← العودة
          </button>
          <h2 className="text-2xl font-bold text-gray-800">حاسبة الاحتياجات اليومية</h2>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">الاسم</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-lg p-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">الوزن (كجم)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: parseFloat(e.target.value)})}
                className="w-full border-2 border-gray-300 rounded-lg p-3"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">الطول (سم)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: parseFloat(e.target.value)})}
                className="w-full border-2 border-gray-300 rounded-lg p-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">العمر</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                className="w-full border-2 border-gray-300 rounded-lg p-3"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">الجنس</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg p-3"
              >
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">مستوى النشاط</label>
            <select
              value={formData.activityLevel}
              onChange={(e) => setFormData({...formData, activityLevel: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-lg p-3"
            >
              <option value="sedentary">قليل الحركة</option>
              <option value="light">نشاط خفيف (1-3 أيام)</option>
              <option value="moderate">نشاط متوسط (3-5 أيام)</option>
              <option value="active">نشاط عالي (6-7 أيام)</option>
              <option value="athlete">رياضي محترف</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">الهدف</label>
            <select
              value={formData.goal}
              onChange={(e) => setFormData({...formData, goal: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-lg p-3"
            >
              <option value="cutting">إنقاص الوزن (Cutting)</option>
              <option value="maintenance">الحفاظ على الوزن</option>
              <option value="bulking">زيادة العضلات (Bulking)</option>
            </select>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white rounded-lg p-4 font-bold hover:bg-blue-700 transition"
          >
            حساب الاحتياجات
          </button>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════
  // 📊 صفحة التقارير
  // ═══════════════════════════════════════
  
  const ReportsPage = () => {
    const getPersonalRecords = () => {
      const records = {};
      workouts.forEach(workout => {
        const exerciseId = workout.exercise.id;
        const maxWeight = Math.max(...workout.sets.map(s => parseFloat(s.weight) || 0));
        
        if (!records[exerciseId] || maxWeight > records[exerciseId].weight) {
          records[exerciseId] = {
            exercise: workout.exercise,
            weight: maxWeight,
            date: workout.date
          };
        }
      });
      return Object.values(records);
    };

    const getWeeklyVolume = () => {
      return getThisWeekWorkouts().reduce((total, w) => total + w.volume, 0);
    };

    const personalRecords = getPersonalRecords();
    const weeklyVolume = getWeeklyVolume();

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">التقارير والإحصائيات</h2>

        {/* إحصائيات أسبوعية */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4">الأسبوع الحالي</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-blue-200 text-sm">عدد التمارين</p>
              <p className="text-3xl font-bold">{getThisWeekWorkouts().length}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm">الحجم التدريبي</p>
              <p className="text-3xl font-bold">{weeklyVolume.toFixed(0)}</p>
              <p className="text-blue-200 text-xs">كجم</p>
            </div>
          </div>
        </div>

        {/* الأرقام القياسية الشخصية */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-500" size={24} />
            <h3 className="font-bold text-gray-800">أفضل الأوزان (PR)</h3>
          </div>
          
          {personalRecords.length > 0 ? (
            <div className="space-y-3">
              {personalRecords.map(record => (
                <div key={record.exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-bold text-gray-800">{record.exercise.nameAr}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(record.date).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-blue-600">{record.weight}</p>
                    <p className="text-xs text-gray-500">كجم</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">لا توجد سجلات بعد. ابدأ التمرين!</p>
          )}
        </div>

        {/* آخر 10 تمارين */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="font-bold text-gray-800 mb-4">آخر التمارين</h3>
          {workouts.length > 0 ? (
            <div className="space-y-3">
              {workouts.slice(-10).reverse().map(workout => (
                <div key={workout.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800">{workout.exercise.nameAr}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(workout.date).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <div className="flex gap-3 text-sm text-gray-600">
                    <span>{workout.sets.length} مجموعات</span>
                    <span>•</span>
                    <span>الحجم: {workout.volume.toFixed(0)} كجم</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">لا توجد تمارين بعد</p>
          )}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════
  // ⚙️ صفحة الإعدادات
  // ═══════════════════════════════════════
  
  const SettingsPage = () => {
    const exportData = () => {
      const data = {
        userProfile,
        workouts,
        meals,
        dailyGoals,
        exportDate: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `gym-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    };

    const clearAllData = () => {
      if (confirm('هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء!')) {
        localStorage.removeItem('gymTrackerData');
        setWorkouts([]);
        setMeals([]);
        alert('تم حذف جميع البيانات بنجاح');
      }
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">الإعدادات</h2>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="font-bold text-gray-800 mb-4">المعلومات الشخصية</h3>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-bold">الاسم:</span> {userProfile.name}</p>
            <p><span className="font-bold">الوزن:</span> {userProfile.weight} كجم</p>
            <p><span className="font-bold">الطول:</span> {userProfile.height} سم</p>
            <p><span className="font-bold">العمر:</span> {userProfile.age} سنة</p>
            <p><span className="font-bold">الهدف:</span> {
              userProfile.goal === 'bulking' ? 'زيادة العضلات' :
              userProfile.goal === 'cutting' ? 'إنقاص الوزن' :
              'الحفاظ على الوزن'
            }</p>
          </div>
          <button
            onClick={() => setCurrentPage('nutrition')}
            className="mt-4 w-full border-2 border-blue-500 text-blue-600 rounded-lg p-3 font-bold hover:bg-blue-50 transition"
          >
            تعديل المعلومات
          </button>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="font-bold text-gray-800 mb-4">البيانات</h3>
          <div className="space-y-3">
            <button
              onClick={exportData}
              className="w-full bg-green-600 text-white rounded-lg p-3 font-bold hover:bg-green-700 transition"
            >
              تصدير البيانات (JSON)
            </button>
            <button
              onClick={clearAllData}
              className="w-full bg-red-600 text-white rounded-lg p-3 font-bold hover:bg-red-700 transition"
            >
              حذف جميع البيانات
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="font-bold text-gray-800 mb-4">الإحصائيات</h3>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-bold">إجمالي التمارين:</span> {workouts.length}</p>
            <p><span className="font-bold">إجمالي الوجبات:</span> {meals.length}</p>
            <p><span className="font-bold">تم الإنشاء:</span> تطبيق النادي الشخصي</p>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════
  // 📱 مكون شريط التقدم للعناصر الغذائية
  // ═══════════════════════════════════════
  
  const NutrientProgress = ({ label, current, target, color, unit }) => {
    const percentage = Math.min((current / target) * 100, 100);
    const remaining = Math.max(target - current, 0);
    
    const getColor = () => {
      if (percentage >= 100) return 'green';
      if (percentage >= 80) return color;
      return 'red';
    };

    const colorClasses = {
      blue: 'bg-blue-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      green: 'bg-green-500'
    };

    return (
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-bold text-gray-700">{label}</span>
          <span className="text-sm text-gray-600">
            {current.toFixed(0)} / {target} {unit}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full ${colorClasses[getColor()]} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {remaining > 0 ? `متبقي: ${remaining.toFixed(0)} ${unit}` : '✓ تم الوصول للهدف!'}
        </p>
      </div>
    );
  };

  // ═══════════════════════════════════════
  // 📱 شريط التنقل السفلي
  // ═══════════════════════════════════════
  
  const Navigation = () => {
    const navItems = [
      { id: 'dashboard', icon: Home, label: 'الرئيسية' },
      { id: 'workout', icon: Dumbbell, label: 'التمارين' },
      { id: 'nutrition', icon: Utensils, label: 'التغذية' },
      { id: 'reports', icon: BarChart3, label: 'التقارير' },
      { id: 'settings', icon: Settings, label: 'الإعدادات' }
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setWorkoutSystem(null);
                setSelectedDay(null);
                setSelectedExercise(null);
              }}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition ${
                currentPage === item.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500'
              }`}
            >
              <item.icon size={22} />
              <span className="text-xs font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════
  // 🎨 عرض الصفحة الحالية
  // ═══════════════════════════════════════
  
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'workout':
        return <WorkoutPage />;
      case 'nutrition':
        return <NutritionPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  // ═══════════════════════════════════════
  // 🎯 العرض النهائي للتطبيق
  // ═══════════════════════════════════════
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24" dir="rtl">
      {/* المحتوى الرئيسي */}
      <div className="max-w-md mx-auto p-4">
        {renderCurrentPage()}
      </div>

      {/* شريط التنقل */}
      <Navigation />
    </div>
  );
}
