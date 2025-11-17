
const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const BENGALI_MONTHS = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const toBengaliNumber = (n: number): string => {
    return n.toString().split('').map(digit => BENGALI_DIGITS[parseInt(digit, 10)]).join('');
};

export const getBengaliDate = (): string => {
    const date = new Date();
    const day = toBengaliNumber(date.getDate());
    const month = BENGALI_MONTHS[date.getMonth()];
    const year = toBengaliNumber(date.getFullYear());

    return `${day} ${month} ${year}`;
};
