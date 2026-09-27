// Placeholder / stub data for the SALAR 07 mini app UI.
// Replace with real data from the persistence layer described in PLAN.md.

export type ActivityItem = {
  id: string
  type: 'ad' | 'referral' | 'withdrawal' | 'bonus'
  title: string
  subtitle: string
  amount: number
  date: string
}

export type EarningTransaction = {
  id: string
  type: 'ad' | 'referral' | 'bonus'
  title: string
  amount: number
  date: string
  status: 'تکمیل‌شده' | 'در حال بررسی'
}

export type WithdrawalRequest = {
  id: string
  amount: number
  method: string
  destination: string
  date: string
  status: 'در حال بررسی' | 'تایید شده' | 'پرداخت شده' | 'رد شده'
}

export type ReferralTier = {
  threshold: number
  reward: string
  achieved: boolean
}

export type FaqItem = {
  question: string
  answer: string
}

export const CURRENCY = 'AFN'

export function formatAmount(value: number) {
  return `${value.toLocaleString('en-US')} ${CURRENCY}`
}

export const currentUser = {
  fullName: 'همکار عزیز',
  username: '@salar07_user',
  telegramId: '5839217640',
  memberSince: '۱۴۰۳/۰۲/۱۸',
  tier: 'عضو نقره‌ای',
  avatarInitials: 'س',
  level: 2,
  levelProgress: 62,
}

export const dashboardStats = {
  availableBalance: 4280,
  totalEarnings: 18640,
  referralsCount: 23,
  adsViewed: 612,
}

export const recentActivity: ActivityItem[] = [
  {
    id: 'a1',
    type: 'ad',
    title: 'مشاهده تبلیغ',
    subtitle: 'کمپین تبلیغاتی شریک تجاری',
    amount: 12,
    date: 'امروز، ۱۰:۲۴',
  },
  {
    id: 'a2',
    type: 'referral',
    title: 'پاداش معرفی',
    subtitle: 'عضویت کاربر جدید از طریق لینک شما',
    amount: 150,
    date: 'امروز، ۰۸:۵۰',
  },
  {
    id: 'a3',
    type: 'ad',
    title: 'مشاهده تبلیغ',
    subtitle: 'کمپین تبلیغاتی شریک تجاری',
    amount: 12,
    date: 'دیروز، ۲۱:۱۰',
  },
  {
    id: 'a4',
    type: 'withdrawal',
    title: 'درخواست برداشت',
    subtitle: 'انتقال به کارت بانکی',
    amount: -2000,
    date: 'دیروز، ۱۷:۳۰',
  },
  {
    id: 'a5',
    type: 'bonus',
    title: 'پاداش هفتگی',
    subtitle: 'فعالیت منظم در این هفته',
    amount: 80,
    date: '۳ روز پیش',
  },
]

export const referralData = {
  code: 'SALAR07-4X9K2',
  link: 'https://t.me/salar07_bot?start=SALAR07-4X9K2',
  totalReferrals: 23,
  activeReferrals: 17,
  nextTierAt: 30,
  tiers: [
    { threshold: 5, reward: 'پاداش نقدی ۲۰۰ AFN', achieved: true },
    { threshold: 15, reward: 'پاداش نقدی ۶۰۰ AFN', achieved: true },
    { threshold: 30, reward: 'ارتقا به سطح طلایی', achieved: false },
    { threshold: 50, reward: 'پاداش نقدی ۲٬۵۰۰ AFN', achieved: false },
  ] satisfies ReferralTier[],
  recentReferrals: [
    { name: 'ک. احمدی', date: '۲ روز پیش', status: 'فعال' },
    { name: 'م. حسینی', date: '۴ روز پیش', status: 'فعال' },
    { name: 'ع. کریمی', date: '۱ هفته پیش', status: 'در انتظار فعال‌سازی' },
  ],
}

export const earningsHistory: EarningTransaction[] = [
  { id: 'e1', type: 'ad', title: 'مشاهده تبلیغ', amount: 12, date: '۱۴۰۳/۰۶/۰۴', status: 'تکمیل‌شده' },
  { id: 'e2', type: 'referral', title: 'پاداش معرفی کاربر', amount: 150, date: '۱۴۰۳/۰۶/۰۴', status: 'تکمیل‌شده' },
  { id: 'e3', type: 'ad', title: 'مشاهده تبلیغ', amount: 12, date: '۱۴۰۳/۰۶/۰۳', status: 'تکمیل‌شده' },
  { id: 'e4', type: 'bonus', title: 'پاداش هفتگی فعالیت', amount: 80, date: '۱۴۰۳/۰۶/۰۱', status: 'تکمیل‌شده' },
  { id: 'e5', type: 'ad', title: 'مشاهده تبلیغ', amount: 12, date: '۱۴۰۳/۰۵/۳۰', status: 'تکمیل‌شده' },
  { id: 'e6', type: 'referral', title: 'پاداش معرفی کاربر', amount: 150, date: '۱۴۰۳/۰۵/۲۸', status: 'در حال بررسی' },
  { id: 'e7', type: 'ad', title: 'مشاهده تبلیغ', amount: 12, date: '۱۴۰۳/۰۵/۲۷', status: 'تکمیل‌شده' },
]

export const weeklyAdsViewed = [62, 74, 58, 90, 81, 96, 71]
export const weeklyLabels = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه']

export const earningsTrend = [420, 560, 480, 690, 610, 740, 650]

export const earningsSourceBreakdown = {
  labels: ['تبلیغات', 'معرفی کاربران', 'پاداش‌ها'],
  data: [58, 32, 10],
}

export const withdrawalHistory: WithdrawalRequest[] = [
  { id: 'w1', amount: 2000, method: 'کارت بانکی', destination: '**** ۴۴۱۲', date: '۱۴۰۳/۰۶/۰۳', status: 'پرداخت شده' },
  { id: 'w2', amount: 1500, method: 'حواله موبایلی', destination: '۰۷۹۹۱۲۳۴۵۶', date: '۱۴۰۳/۰۵/۲۰', status: 'پرداخت شده' },
  { id: 'w3', amount: 1000, method: 'کارت بانکی', destination: '**** ۴۴۱۲', date: '۱۴۰۳/۰۵/۰۵', status: 'رد شده' },
]

export const withdrawalMethods = [
  { id: 'bank', label: 'کارت بانکی', hint: 'انتقال به حساب بانکی داخلی' },
  { id: 'mobile', label: 'حواله موبایلی', hint: 'پرداخت از طریق شرکت‌های حواله معتبر' },
]

export const minWithdrawal = 500

export const faqs: FaqItem[] = [
  {
    question: 'حداقل مبلغ برای درخواست برداشت چقدر است؟',
    answer: `حداقل مبلغ قابل برداشت ${minWithdrawal} ${CURRENCY} است. درخواست‌های کمتر از این مبلغ پردازش نمی‌شوند.`,
  },
  {
    question: 'زمان بررسی و پرداخت درخواست برداشت چقدر طول می‌کشد؟',
    answer: 'درخواست‌های برداشت معمولاً ظرف مدت ۱ تا ۳ روز کاری بررسی و پردازش می‌شوند.',
  },
  {
    question: 'چگونه می‌توانم کاربران بیشتری معرفی کنم؟',
    answer: 'لینک اختصاصی خود را از بخش «معرفی و پاداش» کپی کرده و با دیگران به اشتراک بگذارید. با فعال شدن هر عضو جدید، پاداش مربوطه به حساب شما افزوده می‌شود.',
  },
  {
    question: 'آیا اطلاعات و تراکنش‌های من محفوظ است؟',
    answer: 'حریم خصوصی و امنیت اطلاعات کاربران برای ما در اولویت است و تمامی تراکنش‌ها ثبت و قابل پیگیری هستند.',
  },
]

export const supportChannels = [
  { label: 'گفتگو با پشتیبانی', value: '@salar07_support', icon: 'send' as const },
  { label: 'ایمیل پشتیبانی', value: 'support@salar07.com', icon: 'mail' as const },
  { label: 'ساعات پاسخگویی', value: 'هر روز، ۰۸:۰۰ تا ۲۰:۰۰', icon: 'clock' as const },
]

export const companyInfo = {
  founded: '۱۴۰۲',
  mission:
    'سالار ۰۷ یک پلتفرم تبلیغاتی و بازاریابی دیجیتال است که با اتصال کاربران به کمپین‌های تبلیغاتی معتبر، فرصتی شفاف برای کسب درآمد جانبی فراهم می‌کند.',
  values: [
    { title: 'شفافیت', desc: 'تمامی تراکنش‌ها و پاداش‌ها به‌صورت شفاف ثبت و قابل مشاهده هستند.' },
    { title: 'اعتماد', desc: 'همکاری با کمپین‌های تبلیغاتی معتبر و پردازش منظم درخواست‌های برداشت.' },
    { title: 'حرفه‌ای‌گری', desc: 'تیمی متخصص در حوزه تبلیغات دیجیتال و بازاریابی عملکردی.' },
  ],
  stats: [
    { label: 'کاربران فعال', value: '+۴۰,۰۰۰' },
    { label: 'کمپین تبلیغاتی', value: '+۱۲۰' },
    { label: 'سال فعالیت', value: '۳' },
  ],
}