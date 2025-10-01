import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 더미 제출 처리
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // 3초 후 상태 리셋
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', contact: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-korean">
            문의 및 상담
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-korean">
            프로젝트 문의, 기술 상담, 견적 요청 등 
            언제든지 전문가와 상담받으실 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 연락처 정보 */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 font-korean">
              연락처 정보
            </h3>
            
            <div className="space-y-6">
              {/* 전화번호 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1 font-korean">대표전화</h4>
                  <p className="text-muted-foreground font-english">02-0000-0000</p>
                  <p className="text-sm text-muted-foreground font-korean">평일 09:00 - 18:00</p>
                </div>
              </div>

              {/* 이메일 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1 font-korean">이메일</h4>
                  <p className="text-muted-foreground font-english">info@engineering-corp.co.kr</p>
                  <p className="text-sm text-muted-foreground font-korean">24시간 접수 가능</p>
                </div>
              </div>

              {/* 주소 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1 font-korean">본사</h4>
                  <p className="text-muted-foreground font-korean">서울특별시 ○○구 ○○로 123</p>
                  <p className="text-sm text-muted-foreground font-korean">○○빌딩 5층</p>
                </div>
              </div>

              {/* 운영시간 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1 font-korean">운영시간</h4>
                  <p className="text-muted-foreground font-korean">평일: 09:00 - 18:00</p>
                  <p className="text-sm text-muted-foreground font-korean">토요일: 09:00 - 13:00 (격주)</p>
                  <p className="text-sm text-muted-foreground font-korean">일요일 및 공휴일: 휴무</p>
                </div>
              </div>
            </div>

            {/* 긴급 연락처 */}
            <div className="mt-8 p-6 bg-white rounded-lg border border-border">
              <h4 className="text-lg font-semibold text-foreground mb-3 font-korean">
                긴급 상황 대응
              </h4>
              <p className="text-sm text-muted-foreground mb-3 font-korean">
                구조물 안전 관련 긴급상황 발생 시 24시간 대응 가능합니다.
              </p>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-500" />
                <span className="text-red-500 font-medium font-english">010-0000-0000</span>
                <span className="text-sm text-muted-foreground font-korean">(긴급상황 전용)</span>
              </div>
            </div>
          </div>

          {/* 문의 폼 */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 font-korean">
              온라인 문의
            </h3>

            {isSubmitted ? (
              <div className="bg-white rounded-lg p-8 text-center border border-border">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2 font-korean">
                  문의가 접수되었습니다
                </h4>
                <p className="text-muted-foreground font-korean">
                  빠른 시일 내에 담당자가 연락드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 border border-border space-y-6">
                {/* 이름 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 font-korean">
                    이름 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary font-korean"
                    placeholder="성함을 입력하세요"
                  />
                </div>

                {/* 연락처 */}
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-2 font-korean">
                    연락처 *
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="전화번호 또는 이메일"
                  />
                </div>

                {/* 문의 유형 */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2 font-korean">
                    문의 유형 *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary font-korean"
                  >
                    <option value="">문의 유형을 선택하세요</option>
                    <option value="diagnosis">정밀안전진단</option>
                    <option value="design">설계 용역</option>
                    <option value="supervision">건설사업관리</option>
                    <option value="consulting">기술 컨설팅</option>
                    <option value="partnership">파트너십</option>
                    <option value="other">기타</option>
                  </select>
                </div>

                {/* 문의 내용 */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 font-korean">
                    문의 내용 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary resize-none font-korean"
                    placeholder="구체적인 문의 내용을 입력해 주세요"
                  />
                </div>

                {/* 개인정보 동의 */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 w-4 h-4 text-secondary border-border rounded focus:ring-secondary"
                  />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground font-korean">
                    개인정보 수집 및 이용에 동의합니다. 
                    <span className="text-secondary cursor-pointer hover:underline"> (상세내용 보기)</span>
                  </label>
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  className="w-full btn-primary-korean text-lg flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  문의 보내기
                </button>
              </form>
            )}

            {/* 지도 영역 (더미) */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-foreground mb-4 font-korean">
                오시는 길
              </h4>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center border border-border">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 font-korean">지도 영역</p>
                  <p className="text-sm text-gray-400 font-korean">서울특별시 ○○구 ○○로 123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};