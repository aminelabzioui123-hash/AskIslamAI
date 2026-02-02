/**
 * نظام دمج الأحاديث النبوية - AskIslamAI
 * يتصل بـ GitHub API للحصول على الأحاديث باللغة العربية
 */

class HadithIntegration {
    constructor() {
        // مصادر الأحاديث من hadith-api
        this.baseURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1';
        
        // الكتب المتاحة باللغة العربية
        this.arabicBooks = {
            'bukhari': { name: 'صحيح البخاري', priority: 1 },
            'muslim': { name: 'صحيح مسلم', priority: 2 },
            'abudawud': { name: 'سنن أبي داود', priority: 3 },
            'tirmidhi': { name: 'جامع الترمذي', priority: 4 },
            'nasai': { name: 'سنن النسائي', priority: 5 },
            'ibnmajah': { name: 'سنن ابن ماجه', priority: 6 },
            'malik': { name: 'موطأ مالك', priority: 7 },
            'ahmad': { name: 'مسند أحمد', priority: 8 }
        };
        
        this.cache = new Map(); // للتخزين المؤقت
    }

    /**
     * البحث عن أحاديث ذات صلة بالسؤال
     */
    async searchRelevantHadiths(query, maxResults = 3) {
        const keywords = this.extractKeywords(query);
        const results = [];

        try {
            // البحث في صحيح البخاري وصحيح مسلم أولاً (أصح الكتب)
            for (const [bookKey, bookInfo] of Object.entries(this.arabicBooks)) {
                if (results.length >= maxResults) break;
                
                try {
                    const hadiths = await this.fetchBookHadiths(bookKey);
                    const matches = this.findMatchingHadiths(hadiths, keywords, bookInfo.name);
                    results.push(...matches.slice(0, maxResults - results.length));
                } catch (error) {
                    console.warn(`تعذر جلب الأحاديث من ${bookInfo.name}:`, error);
                    continue;
                }
            }

            return results;
        } catch (error) {
            console.error('خطأ في البحث عن الأحاديث:', error);
            return [];
        }
    }

    /**
     * استخراج الكلمات المفتاحية من السؤال
     */
    extractKeywords(query) {
        // إزالة كلمات الاستفهام والكلمات الشائعة
        const stopWords = ['ما', 'هو', 'هي', 'كيف', 'لماذا', 'متى', 'أين', 'من', 'هل', 
                          'في', 'على', 'عن', 'إلى', 'من', 'أن', 'أو', 'و', 'ف', 'ل',
                          'ال', 'حكم', 'معنى', 'تفسير', 'شرح'];
        
        const words = query.split(/\s+/)
            .map(w => w.replace(/[؟!،.]/g, '').trim())
            .filter(w => w.length > 2 && !stopWords.includes(w));

        // إضافة كلمات مفتاحية خاصة بالمواضيع الإسلامية
        const topicKeywords = {
            'صلاة|صلوات': ['صلاة', 'صلى', 'يصلي', 'ركعة', 'سجود'],
            'وضوء': ['وضوء', 'توضأ', 'يتوضأ', 'طهارة'],
            'صيام|صوم': ['صيام', 'صوم', 'صام', 'يصوم', 'رمضان', 'إفطار'],
            'زكاة': ['زكاة', 'صدقة', 'مال'],
            'حج': ['حج', 'عمرة', 'حاج', 'طواف', 'سعي'],
            'جهاد': ['جهاد', 'قتال', 'غزو'],
            'نكاح|زواج': ['نكاح', 'زواج', 'تزوج', 'عقد'],
            'طلاق': ['طلاق', 'فراق', 'خلع']
        };

        const enhancedKeywords = new Set(words);
        
        for (const [pattern, relatedWords] of Object.entries(topicKeywords)) {
            const regex = new RegExp(pattern, 'i');
            if (regex.test(query)) {
                relatedWords.forEach(w => enhancedKeywords.add(w));
            }
        }

        return Array.from(enhancedKeywords);
    }

    /**
     * جلب أحاديث من كتاب معين
     */
    async fetchBookHadiths(bookKey) {
        // التحقق من الذاكرة المؤقتة
        if (this.cache.has(bookKey)) {
            return this.cache.get(bookKey);
        }

        try {
            const url = `${this.baseURL}/editions/ara-${bookKey}.json`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            const hadiths = data.hadiths || [];
            
            // حفظ في الذاكرة المؤقتة
            this.cache.set(bookKey, hadiths);
            
            return hadiths;
        } catch (error) {
            console.error(`خطأ في جلب ${bookKey}:`, error);
            return [];
        }
    }

    /**
     * البحث عن أحاديث مطابقة للكلمات المفتاحية
     */
    findMatchingHadiths(hadiths, keywords, bookName) {
        const matches = [];
        
        for (const hadith of hadiths) {
            if (!hadith || !hadith.text) continue;
            
            const text = hadith.text.toLowerCase();
            let score = 0;

            // حساب درجة التطابق
            for (const keyword of keywords) {
                const keywordLower = keyword.toLowerCase();
                if (text.includes(keywordLower)) {
                    score += 1;
                    // إضافة نقاط إضافية للتطابقات المتعددة
                    const occurrences = (text.match(new RegExp(keywordLower, 'g')) || []).length;
                    score += (occurrences - 1) * 0.5;
                }
            }

            if (score > 0) {
                matches.push({
                    text: hadith.text,
                    book: bookName,
                    hadithNumber: hadith.hadithnumber || hadith.reference,
                    chapter: hadith.chapter || '',
                    grades: hadith.grades || [],
                    score: score
                });
            }
        }

        // ترتيب النتائج حسب الدرجة
        return matches.sort((a, b) => b.score - a.score);
    }

    /**
     * تنسيق الحديث للعرض
     */
    formatHadith(hadith) {
        let formatted = `📖 **${hadith.book}**\n\n`;
        formatted += `${hadith.text}\n\n`;
        
        if (hadith.hadithNumber) {
            formatted += `🔢 رقم الحديث: ${hadith.hadithNumber}\n`;
        }
        
        if (hadith.chapter) {
            formatted += `📚 الباب: ${hadith.chapter}\n`;
        }
        
        if (hadith.grades && hadith.grades.length > 0) {
            formatted += `✅ الدرجة: ${hadith.grades.join(', ')}\n`;
        }
        
        return formatted;
    }

    /**
     * تنسيق جميع الأحاديث للعرض
     */
    formatAllHadiths(hadiths) {
        if (!hadiths || hadiths.length === 0) {
            return null;
        }

        let formatted = '\n\n━━━━━━━━━━━━━━━━━━━━━━\n';
        formatted += '📚 **الأحاديث ذات الصلة:**\n';
        formatted += '━━━━━━━━━━━━━━━━━━━━━━\n\n';

        hadiths.forEach((hadith, index) => {
            formatted += `**${index + 1}. من ${hadith.book}:**\n\n`;
            formatted += `"${hadith.text}"\n\n`;
            
            if (hadith.hadithNumber) {
                formatted += `🔢 رقم: ${hadith.hadithNumber}`;
            }
            
            if (hadith.grades && hadith.grades.length > 0) {
                formatted += ` | ✅ ${hadith.grades.join(', ')}`;
            }
            
            formatted += '\n\n';
            
            if (index < hadiths.length - 1) {
                formatted += '─────────────────────\n\n';
            }
        });

        return formatted;
    }

    /**
     * الحصول على أحاديث عشوائية (للصفحة الرئيسية)
     */
    async getRandomHadiths(count = 5) {
        try {
            const bukhari = await this.fetchBookHadiths('bukhari');
            const muslim = await this.fetchBookHadiths('muslim');
            
            const allHadiths = [...bukhari, ...muslim];
            const randomHadiths = [];
            
            for (let i = 0; i < count && allHadiths.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * allHadiths.length);
                const hadith = allHadiths.splice(randomIndex, 1)[0];
                
                if (hadith && hadith.text) {
                    randomHadiths.push({
                        text: hadith.text,
                        book: i < count / 2 ? 'صحيح البخاري' : 'صحيح مسلم',
                        hadithNumber: hadith.hadithnumber || hadith.reference
                    });
                }
            }
            
            return randomHadiths;
        } catch (error) {
            console.error('خطأ في جلب الأحاديث العشوائية:', error);
            return [];
        }
    }

    /**
     * البحث في كتاب محدد
     */
    async searchInSpecificBook(bookKey, query) {
        try {
            const hadiths = await this.fetchBookHadiths(bookKey);
            const keywords = this.extractKeywords(query);
            const bookName = this.arabicBooks[bookKey]?.name || bookKey;
            
            return this.findMatchingHadiths(hadiths, keywords, bookName);
        } catch (error) {
            console.error(`خطأ في البحث في ${bookKey}:`, error);
            return [];
        }
    }
}

// تصدير للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HadithIntegration;
}
