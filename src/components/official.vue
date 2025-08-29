<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
  <div class="min-h-screen">
    <!-- 固定导航栏 -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 shadow-sm backdrop-blur-sm">
      <div class="w-full px-6 h-20 flex items-center justify-between">
        <div class="flex items-center">
          <img :src="logoUrl" alt="Gephura" class="h-12 md:h-12 h-10">
        </div>
        <!-- 移动端菜单按钮 -->
        <div class="flex items-center gap-4">
          <button @click="toggleMenu" class="md:hidden text-gray-600 hover:text-blue-600 transition-colors">
            <i class="fas" :class="isMenuOpen ? 'fa-times' : 'fa-bars'"></i>
          </button>
        </div>
        <!-- 桌面端导航 -->
        <div class="hidden md:flex items-center space-x-8">
          <a v-for="item in navItems" :key="item.id" :class="['hover:text-blue-600 transition-colors cursor-pointer',
            currentNav === item.id ? 'text-blue-600' : 'text-gray-700']" @click="scrollToSection(item.id)">
            {{ i18n[currentLang].nav[item.id] }}
          </a>
          <!-- 语言切换按钮 -->
          <div class="relative">
            <button @click="toggleLangMenu" class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <i class="fas fa-globe"></i>
              <span>{{ currentLang === 'en' ? 'EN' : currentLang === 'cn' ? '中文' : 'VI' }}</span>
              <i class="fas fa-chevron-down text-xs"></i>
            </button>
            <!-- 语言切换下拉菜单 -->
            <div v-show="isLangMenuOpen" class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2">
              <button @click="currentLang = 'en'" 
                :class="['w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors', 
                currentLang === 'en' ? 'text-blue-600' : 'text-gray-600']">
                English
              </button>
              <button @click="currentLang = 'cn'"
                :class="['w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors',
                currentLang === 'cn' ? 'text-blue-600' : 'text-gray-600']">
                中文
              </button>
              <button @click="currentLang = 'vi'"
                :class="['w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors',
                currentLang === 'vi' ? 'text-blue-600' : 'text-gray-600']">
                Tiếng Việt
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 移动端菜单 -->
      <div v-show="isMenuOpen" class="md:hidden fixed inset-0 bg-black/50 z-40" @click="isMenuOpen = false">
      </div>
      <div v-show="isMenuOpen"
        class="md:hidden fixed right-0 top-20 w-64 bg-white shadow-lg rounded-l-xl z-50 transform transition-transform duration-300"
        :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'">
        <div class="py-4 px-6 space-y-4">
          <a v-for="item in navItems" :key="item.id" :class="['block py-2 hover:text-blue-600 transition-colors cursor-pointer',
            currentNav === item.id ? 'text-blue-600' : 'text-gray-700']" @click="handleMobileNavClick(item.id)">
            {{ i18n[currentLang].nav[item.id] }}
          </a>
          <!-- 移动端语言切换按钮 -->
          <div class="border-t pt-4 mt-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-600">{{ currentLang === 'en' ? 'Language' : currentLang === 'cn' ? '语言' : 'Ngôn ngữ' }}</span>
              <div class="flex gap-2">
                <button @click="currentLang = 'en'" 
                  :class="['px-3 py-1 rounded-md transition-colors', 
                  currentLang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
                  EN
                </button>
                <button @click="currentLang = 'cn'"
                  :class="['px-3 py-1 rounded-md transition-colors',
                  currentLang === 'cn' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
                  中文
                </button>
                <button @click="currentLang = 'vi'"
                  :class="['px-3 py-1 rounded-md transition-colors',
                  currentLang === 'vi' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
                  VI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Hero区域 -->
    <div class="relative h-[600px] md:h-[600px] h-[500px] pt-20 w-full overflow-hidden" style="top: 50px;">
      <!-- 背景视频 -->
      <video
        :src="heroVideo"
        class="hero-video absolute inset-0 w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
        @error="handleVideoError"
      ></video>

      <!-- 文字内容覆盖层 -->
      <!-- <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
        <div class="w-full px-6">
          <h1 class="md:text-5xl text-3xl font-bold text-white mb-6">{{ i18n[currentLang].hero.title }}</h1>
          <p class="md:text-xl text-lg text-white/90 mb-8 max-w-2xl">{{ i18n[currentLang].hero.subtitle }}</p>
          <button @click="scrollToSection('contact')"
            class="!rounded-button bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 text-lg hover:from-blue-700 hover:to-blue-900 transition-all whitespace-nowrap group flex items-center gap-3">
            {{ i18n[currentLang].hero.cta }}
            <i class="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform"></i>
          </button>
        </div>
      </div> -->
    </div>
    <!-- 关于我们 -->
    <section id="about" class="py-20 w-full">
      <div class="w-full px-6">
        <div class="flex items-center gap-12">
          <div class="flex-1">
            <h2 class="text-3xl font-bold mb-6">{{ i18n[currentLang].about.title }}</h2>
            <p class="text-gray-600 text-lg leading-relaxed text-left whitespace-pre-line">
              {{ i18n[currentLang].about.content }}
            </p>
          </div>
          <div class="flex-1">
            <img :src="aboutImage" alt="About Us" class="rounded-lg shadow-lg">
          </div>
        </div>
      </div>
    </section>
    <!-- 核心服务 -->
    <section id="services" class="py-20 bg-gray-50 w-full">
      <div class="w-full px-6">
        <h2 class="text-3xl font-bold text-center mb-16">{{ i18n[currentLang].services.title }}</h2>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          <div v-for="service in i18n[currentLang].services.items" :key="service.title"
            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
            <img :src="getServiceImage(service.title)" :alt="service.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-4">{{ service.title }}</h3>
              <p class="text-gray-600 mb-6 min-h-[4.5rem] line-clamp-3">{{ service.description }}</p>
              <button @click="showServiceDetails(service)"
                class="!rounded-button text-blue-600 hover:bg-blue-50 px-6 py-2 border border-blue-600 transition-all whitespace-nowrap">
                {{ i18n[currentLang].services.more }}
              </button>
              <!-- 服务详情弹窗 -->
              <div v-if="showServiceModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div class="p-8">
                    <div class="flex justify-between items-center mb-8">
                      <h3 class="text-2xl md:text-3xl font-bold text-gray-900">{{ currentService.title }}</h3>
                      <button @click="showServiceModal = false" class="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
                        <i class="fas fa-times text-xl"></i>
                      </button>
                    </div>

                    <!-- 服务介绍 -->
                    <div class="mb-8">
                      <div v-html="currentService.content" class="text-gray-700 leading-relaxed space-y-6"></div>
                    </div>



                    <!-- 底部操作区 -->
                    <div class="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
                      <button @click="showServiceModal = false; scrollToSection('contact')"
                        class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        立即咨询
                        <i class="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 行业案例 -->
    <section id="cases" class="py-20 w-full">
      <div class="w-full px-6">
        <h2 class="text-3xl font-bold text-center mb-16">{{ i18n[currentLang].cases.title }}</h2>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          <div v-for="case_ in i18n[currentLang].cases.items" :key="case_.title"
            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
            <img :src="getCaseImage(case_.title)" :alt="case_.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-4">{{ case_.title }}</h3>
              <p class="text-gray-600">{{ case_.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 联系我们 -->
    <section id="contact" class="py-20 bg-gray-50 w-full">
      <div class="w-full px-6">
        <h2 class="text-3xl font-bold text-center mb-16">{{ i18n[currentLang].contact.title }}</h2>
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <p class="text-lg text-gray-600 leading-relaxed">
              {{ i18n[currentLang].contact.description }}
            </p>
          </div>
          <div class="grid md:grid-cols-3 grid-cols-1 gap-8">
            <!-- 电子邮箱 -->
            <div class="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <i class="fas fa-envelope text-blue-600 text-2xl mb-4"></i>
              <span class="text-gray-700 font-medium">{{ currentLang === 'en' ? 'Email' : currentLang === 'cn' ? '电子邮箱' : 'Email' }}</span>
              <a href="mailto:info@gephura.cn" class="text-blue-600 hover:text-blue-800 mt-2">info@gephura.cn</a>
            </div>

            <!-- 企业微信二维码 -->
            <div class="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <i class="fas fa-qrcode text-green-600 text-2xl mb-4"></i>
              <span class="text-gray-700 font-medium">{{ currentLang === 'en' ? 'WeChat Work' : currentLang === 'cn' ? '企业微信' : 'WeChat Work' }}</span>
              <div class="mt-4">
                <img src="https://gephura-web.oss-cn-shanghai.aliyuncs.com/60c8a96d-de9a-4544-b616-d334b632ac34.jpg" :alt="currentLang === 'en' ? 'WeChat Work QR Code' : currentLang === 'cn' ? '企业微信二维码' : 'Mã QR WeChat Work'" class="w-36 h-36 object-contain">
                <p class="text-gray-500 text-xs mt-2 text-center">{{ currentLang === 'en' ? 'Scan to add' : currentLang === 'cn' ? '扫码添加' : 'Quét để thêm' }}</p>
              </div>
            </div>

            <!-- 微信公众号二维码 -->
            <div class="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <i class="fas fa-qrcode text-purple-600 text-2xl mb-4"></i>
              <span class="text-gray-700 font-medium">{{ currentLang === 'en' ? 'WeChat Official' : currentLang === 'cn' ? '微信公众号' : 'WeChat Official' }}</span>
              <div class="mt-4">
                <img src="https://gephura-web.oss-cn-shanghai.aliyuncs.com/ee2330ff-7a6c-435d-bc21-82422e8914f9.jpg" :alt="currentLang === 'en' ? 'WeChat Official QR Code' : currentLang === 'cn' ? '微信公众号二维码' : 'Mã QR WeChat Official'" class="w-36 h-36 object-contain">
                <p class="text-gray-500 text-xs mt-2 text-center">{{ currentLang === 'en' ? 'Scan to follow' : currentLang === 'cn' ? '扫码关注' : 'Quét để theo dõi' }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <!-- Footer -->
    <footer class="bg-gray-50 py-8 w-full">
      <div class="w-full px-6 text-center text-gray-500 text-sm">
        <p>© 2025 Gephura. All rights reserved.</p>
        <p v-if="currentLang === 'cn'" class="mt-2">沪ICP备2025115766号-2</p>
      </div>
    </footer>
    <!-- 返回顶部按钮 -->
    <button v-show="showBackTop" @click="scrollToTop"
      class="!rounded-button fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 直接使用静态路径，避免类型声明与 import.meta 限制
const logoUrl = 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/G-Logo-Black.svg';

const currentNav = ref('home');
const showServiceModal = ref(false);
const currentService = ref({
  title: '',
  content: ''
});
const showBackTop = ref(false);
type Language = 'en' | 'cn' | 'vi';
const currentLang = ref<Language>('en');

// 视频播放控制
const handleVideoError = () => {
  console.warn('视频加载失败');
};
const i18n = {
  cn: {
    nav: {
      about: '关于我们',
      services: '核心服务',
      cases: '行业案例',
      contact: '联系我们'
    },
    hero: {
      title: '通过 AI 驱动企业创新与增长',
      subtitle: '为企业提供尖端解决方案和专业指导，助力在 AI 时代蓬勃发展。',
      cta: '立即咨询'
    },
    about: {
      title: '关于我们',
      content: '在 Gephura，我们致力于通过 AI线下营销解决方案，帮助企业实现品牌传播与销售模式的全面升级。我们坚信，未来的AI营销不仅仅停留在线上网络世界中，更需要渗透到展会、展厅、门店、广告等真实场景中。\n\n我们的产品与服务将 人工智能、数字人、硬件终端与内容创意高度整合，为企业打造从 吸引客户 → 互动沟通 → 数据洞察 → 转化成交 的完整闭环。团队核心成员来自全球知名企业，具备国际化视野、深厚的行业经验和AI技术落地能力。我们不仅懂AI，更懂市场与品牌。\n\n我们的使命是：用AI重新定义线下营销，助力企业全球增长。'
    },
    services: {
      title: '核心服务',
      items: [
        {
          title: 'AI 导购一体机',
          description: '包含软硬件结合的AI导购智能终端，实现数字世界与现实世界的直接接触。将传统的平面宣传材料和多媒体宣传内容以及销售人员的问答能力集成在一台低成本高效率的终端，实现传统BTL Marketing的全面AI升级。'
        },
        {
          title: 'Gephura 数字员工平台',
          description: 'Gephura数字员工平台基于先进的AI智能体技术，融合全链条营销数据与实战经验，构建出一个极简、高效、低门槛的数字员工训练与管理平台。'
        },
        {
          title: '全景定制服务',
          description: '除了标准化的产品与平台，Gephura还为企业提供全面的定制化解决方案，确保AI营销能力与品牌需求深度契合。'
        }
      ],
      more: '了解更多'
    },
    cases: {
      title: '行业案例',
      items: [
        {
          title: '全球展会',
          description: '展会是品牌企业拓展市场、建⽴客⼾联系、发布新产品的重要窗⼝,尤其是国际展会,是出海企业布局全球市场的必经之路。但对于⼴⼤中⼩品牌企业⽽⾔,⼈员成本⾼、语⾔能⼒弱、展位接待效率低等问题始终存在。传统展位往往依赖人⼯讲解与纸质物料,难以在短时间内吸引客⼾、精准传达信息或形成有效互动,造成⾼投⼊、低转化的困局。AI导购数智⼈⼀体机可在不增加⼈员的前提下,实现多语种接待、专业讲解、客⼾留资与数据回传,成为企业性价⽐参展利器。'
        },
        {
          title: '品牌门店',
          description: '在连锁⻔店、⾼端展厅等空间中,企业正寻求新的体验式营销⼿段,摆脱"静态陈列+被动销售"的传统模式。消费者更期待"能对话、会推荐、有引导"的智能体验,⽽⾮⾃取式浏览。通过部署AI导购终端,品牌可在零售⼀线实现主动迎宾、多语咨询、精准产品推荐和即时促销推送,不仅提升客⼾停留时间与转化率,也增强品牌科技感与辨识度。'
        },
        {
          title: '服务大厅',
          description: '银⾏、政务中⼼、医院⼤厅、机场等⾼频接待场景中,传统⼈⼯引导⽅式"问询重复、效率低、体验差"等问题。上⼀代数字⼈设备,交互⽣硬,简陋粗糙。成本⾼,使⽤⻔槛更⾼。以AI数字⼈导览为核⼼的智能接待终端,结合语⾳交互、视觉识别与场景定制内容,能够实现7x24⼩时的信息服务替代与引导分流。对于⼤量已有窗⼝与终端设备的场所,通过软件系统+定制内容的部署,实现低成本数字升级。'
        }
      ]
    },
    contact: {
      title: '让我们共同塑造未来',
      description: '准备好利用 AI 的力量推动您的业务了吗？我们的专家团队随时为您提供 AI 之旅的全程指导。立即联系我们，探索如何帮助您实现前所未有的增长和效率。'
    }
  },
  en: {
    nav: {
      about: 'About Us',
      services: 'Core Services',
      cases: 'Industry Cases',
      contact: 'Contact Us'
    },
    hero: {
      title: 'Drive Enterprise Innovation and Growth through AI',
      subtitle: 'Providing cutting-edge solutions and expert guidance to help enterprises thrive in the AI era.',
      cta: 'Get Started'
    },
    about: {
      title: 'About Us',
      content: 'At Gephura, we are committed to helping enterprises achieve comprehensive upgrades in brand communication and sales models through AI-powered offline marketing solutions. We firmly believe that the future of AI marketing will not only stay in the online world, but must also permeate into real-world scenarios such as exhibitions, showrooms, retail stores, and advertising.\n\nOur products and services deeply integrate artificial intelligence, digital humans, hardware terminals, and creative content to build a complete closed loop for enterprises from attracting customers → interactive communication → data insights → conversion and closing. Our core team members come from globally renowned companies, bringing international perspectives, profound industry experience, and proven capabilities in implementing AI technologies. We not only understand AI, but also have deep insights into markets and brands.\n\nOur mission is to redefine offline marketing with AI and drive global growth for enterprises.'
    },
    services: {
      title: 'Core Services',
      items: [
        {
          title: 'AI Shopping Guide All-in-One Machine',
          description: 'Combining software and hardware to create an intelligent AI shopping guide terminal that achieves direct contact between the digital world and the real world. It integrates traditional flat promotional materials and multimedia content with sales personnel\'s Q&A capabilities into a low-cost, high-efficiency terminal, achieving comprehensive AI upgrades to traditional BTL Marketing.'
        },
        {
          title: 'Gephura Digital Employee Platform',
          description: 'Based on advanced AI intelligent agent technology, the Gephura Digital Employee Platform integrates comprehensive marketing data and practical experience to build a streamlined, efficient, and low-threshold digital employee training and management platform.'
        },
        {
          title: 'Comprehensive Customization Services',
          description: 'In addition to standardized products and platforms, Gephura provides comprehensive customized solutions for enterprises to ensure that AI marketing capabilities are deeply integrated with brand requirements.'
        }
      ],
      more: 'Learn More'
    },
    cases: {
      title: 'Industry Cases',
      items: [
        {
          title: 'Global Exhibitions',
          description: 'Exhibitions are an important window for brands to expand markets, establish customer connections, and release new products, especially international exhibitions, which are essential for enterprises going global. However, for large, medium, and small brands, issues such as high personnel costs, weak language skills, and low booth reception efficiency have always existed. Traditional booths often rely on manual explanations and paper materials, making it difficult to attract customers in a short time, convey information accurately, or create effective interactions, resulting in high investment and low conversion dilemmas. AI shopping guide digital humans can achieve multi-language reception, professional explanations, customer data collection, and data return without increasing personnel, becoming a cost-effective tool for enterprises to participate in exhibitions.'
        },
        {
          title: 'Brand Stores',
          description: 'In retail stores, high-end showrooms, and other spaces, enterprises are seeking new experiential marketing methods to break away from the traditional model of "static display + passive sales". Consumers expect "conversational, recommendable, and guiding" intelligent experiences rather than self-service browsing. By deploying AI shopping guide terminals, brands can achieve active customer greeting, multi-language consultation, precise product recommendations, and instant promotions in the retail frontline, not only improving customer stay time and conversion rates but also enhancing brand technological appeal and recognition.'
        },
        {
          title: 'Service Halls',
          description: 'In high-frequency reception scenarios such as banks, government centers, hospitals, and airport halls, traditional manual guidance methods have problems such as repetitive inquiries, low efficiency, and poor experiences. The previous generation of digital human devices had stiff interactions, crude and simple designs, high costs, and higher usage thresholds. Taking AI digital human guidance as the core, intelligent reception terminals combined with voice interaction, visual recognition, and customized scene content can achieve 7x24-hour information services and diversion guidance. For many existing window and terminal equipment venues, software systems + customized content deployment can achieve low-cost digital upgrades.'
        }
      ]
    },
    contact: {
      title: 'Let\'s Shape the Future Together',
      description: 'Ready to harness the power of AI to drive your business forward? Our expert team is here to provide comprehensive guidance throughout your AI journey. Contact us immediately to explore how we can help you achieve unprecedented growth and efficiency.'
    }
  },
  vi: {
    nav: {
      about: 'Về chúng tôi',
      services: 'Dịch vụ cốt lõi',
      cases: 'Dự án ngành',
      contact: 'Liên hệ chúng tôi'
    },
    hero: {
      title: 'Thúc đẩy đổi mới và tăng trưởng doanh nghiệp thông qua AI',
      subtitle: 'Cung cấp giải pháp tiên tiến và hướng dẫn chuyên môn để giúp doanh nghiệp phát triển trong kỷ nguyên AI.',
      cta: 'Bắt đầu ngay'
    },
    about: {
      title: 'Về chúng tôi',
      content: 'Tại Gephura, chúng tôi cam kết giúp doanh nghiệp đạt được nâng cấp toàn diện về hoạt động truyền thông thương hiệu và mô hình bán hàng thông qua các giải pháp tiếp thị ngoại tuyến dựa trên AI. Chúng tôi tin rằng tương lai của tiếp thị AI không chỉ dừng lại trong thế giới trực tuyến mà còn phải thâm nhập vào các bối cảnh thực tế như hội chợ, phòng trưng bày, cửa hàng bán lẻ và quảng cáo.\n\nSản phẩm và dịch vụ của chúng tôi tích hợp sâu trí tuệ nhân tạo, nhân vật số, thiết bị phần cứng và sáng tạo nội dung để xây dựng một vòng khép kín hoàn chỉnh cho doanh nghiệp từ thu hút khách hàng → tương tác giao tiếp → phân tích dữ liệu → chuyển đổi và chốt đơn. Các thành viên nòng cốt của đội ngũ đến từ các công ty danh tiếng toàn cầu, sở hữu tầm nhìn quốc tế, kinh nghiệm ngành sâu sắc và năng lực triển khai công nghệ AI thực chiến. Chúng tôi không chỉ hiểu AI mà còn am hiểu thị trường và thương hiệu.\n\nSứ mệnh của chúng tôi là: dùng AI tái định nghĩa tiếp thị ngoại tuyến và thúc đẩy tăng trưởng toàn cầu cho doanh nghiệp.'
    },
    services: {
      title: 'Dịch vụ cốt lõi',
      items: [
        {
          title: 'Máy bán hàng thông minh AI tích hợp tất cả',
          description: 'Kết hợp phần mềm và phần cứng để tạo ra thiết bị đầu cuối hướng dẫn mua sắm thông minh AI, đạt được tiếp xúc trực tiếp giữa thế giới số và thế giới thực. Nó tích hợp các tài liệu quảng cáo phẳng truyền thống và nội dung đa phương tiện với khả năng Q&A của nhân viên bán hàng vào một thiết bị đầu cuối có chi phí thấp, hiệu quả cao, đạt được nâng cấp AI toàn diện cho BTL Marketing truyền thống.'
        },
        {
          title: 'Nền tảng nhân viên số Gephura',
          description: 'Dựa trên công nghệ đại lý thông minh AI tiên tiến, nền tảng nhân viên số Gephura tích hợp dữ liệu tiếp thị toàn diện và kinh nghiệm thực tế để xây dựng một nền tảng đào tạo và quản lý nhân viên số đơn giản hóa, hiệu quả và có ngưỡng thấp.'
        },
        {
          title: 'Dịch vụ tùy chỉnh toàn diện',
          description: 'Ngoài các sản phẩm và nền tảng tiêu chuẩn, Gephura cung cấp các giải pháp tùy chỉnh toàn diện cho doanh nghiệp để đảm bảo rằng khả năng tiếp thị AI được tích hợp sâu với yêu cầu thương hiệu.'
        }
      ],
      more: 'Tìm hiểu thêm'
    },
    cases: {
      title: 'Dự án ngành',
      items: [
        {
          title: 'Hội chợ toàn cầu',
          description: 'Hội chợ là cửa sổ quan trọng để các thương hiệu mở rộng thị trường, thiết lập kết nối khách hàng và phát hành sản phẩm mới, đặc biệt là hội chợ quốc tế, là điều cần thiết cho các doanh nghiệp vươn ra toàn cầu. Tuy nhiên, đối với các thương hiệu lớn, vừa và nhỏ, các vấn đề như chi phí nhân sự cao, kỹ năng ngôn ngữ yếu và hiệu quả tiếp đón gian hàng thấp luôn tồn tại. Gian hàng truyền thống thường dựa vào giải thích thủ công và tài liệu giấy, khiến khó thu hút khách hàng trong thời gian ngắn, truyền tải thông tin chính xác hoặc tạo ra tương tác hiệu quả, dẫn đến đầu tư cao và chuyển đổi thấp. Nhân vật số hướng dẫn mua sắm AI có thể đạt được tiếp đón đa ngôn ngữ, giải thích chuyên nghiệp, thu thập dữ liệu khách hàng và trả lại dữ liệu mà không tăng nhân sự, trở thành công cụ hiệu quả về chi phí cho doanh nghiệp tham gia hội chợ.'
        },
        {
          title: 'Cửa hàng thương hiệu',
          description: 'Trong các không gian cửa hàng bán lẻ, phòng trưng bày cao cấp và các không gian khác, doanh nghiệp đang tìm kiếm các phương pháp tiếp thị trải nghiệm mới để thoát khỏi mô hình truyền thống "trưng bày tĩnh + bán hàng thụ động". Người tiêu dùng mong đợi trải nghiệm thông minh "có thể trò chuyện, có thể đề xuất và có thể hướng dẫn" chứ không phải là duyệt tự phục vụ. Bằng cách triển khai thiết bị đầu cuối hướng dẫn mua sắm AI, các thương hiệu có thể đạt được chào đón khách hàng chủ động, tư vấn đa ngôn ngữ, đề xuất sản phẩm chính xác và khuyến mãi tức thì ở tuyến đầu bán lẻ, không chỉ cải thiện thời gian lưu trú và tỷ lệ chuyển đổi của khách hàng mà còn nâng cao sức hấp dẫn công nghệ và khả năng nhận diện thương hiệu.'
        },
        {
          title: 'Sảnh dịch vụ',
          description: 'Trong các kịch bản tiếp đón tần suất cao như ngân hàng, trung tâm chính quyền, bệnh viện và sảnh sân bay, các phương pháp hướng dẫn thủ công truyền thống có vấn đề như câu hỏi lặp lại, hiệu quả thấp và trải nghiệm kém. Thế hệ trước của thiết bị nhân vật số có tương tác cứng nhắc, thiết kế thô sơ, chi phí cao và ngưỡng sử dụng cao hơn. Lấy hướng dẫn nhân vật số AI làm cốt lõi, thiết bị đầu cuối tiếp đón thông minh kết hợp với tương tác giọng nói, nhận dạng thị giác và nội dung tùy chỉnh theo cảnh có thể đạt được dịch vụ thông tin 7x24 giờ và hướng dẫn phân luồng. Đối với nhiều địa điểm có cửa sổ và thiết bị đầu cuối hiện có, việc triển khai hệ thống phần mềm + nội dung tùy chỉnh có thể đạt được nâng cấp số với chi phí thấp.'
        }
      ]
    },
    contact: {
      title: 'Hãy cùng nhau kiến tạo tương lai',
      description: 'Sẵn sàng tận dụng sức mạnh của AI để thúc đẩy doanh nghiệp của bạn tiến lên? Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng cung cấp hướng dẫn toàn diện trong suốt hành trình AI của bạn. Liên hệ với chúng tôi ngay để khám phá cách chúng tôi có thể giúp bạn đạt được tăng trưởng và hiệu quả chưa từng có.'
    }
  }
};
// 英雄区域视频
const heroVideo = 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/offical-main.mp4';
const aboutImage = 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/About-us.svg';

type NavItemId = 'about' | 'services' | 'cases' | 'contact';

const navItems = [
  { id: 'about' as NavItemId, name: '关于我们' },
  { id: 'services' as NavItemId, name: '核心服务' },
  { id: 'cases' as NavItemId, name: '行业案例' },
  { id: 'contact' as NavItemId, name: '联系我们' }
];

const isMenuOpen = ref(false);
const isLangMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const handleMobileNavClick = (id: string) => {
  scrollToSection(id);
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const navHeight = 80; // 导航栏高度
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  currentNav.value = id;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};





const showServiceDetails = (service: any) => {
  const serviceDetails = {
    'AI 导购一体机': {
      title: 'AI 导购一体机',
      content: '<div class="space-y-6">' +
        '<p class="text-lg font-medium text-gray-800 leading-relaxed">' +
          'AI导购数字人一体机，用<strong class="text-blue-600">靓丽灵动的数字人形象</strong>吸引客户驻足，用<strong class="text-blue-600">多语种自然对话</strong>的数字人讲解，结合产品多模态展示打动客户，用定制化的产品知识库和话术实现客户双向深度沟通，并通过主动数据分析掌握客户偏好与购买意向。' +
        '</p>' +

        '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">' +
          '<h4 class="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">' +
            '<i class="fas fa-lightbulb text-blue-600"></i>' +
            '核心优势' +
          '</h4>' +
          '<div class="space-y-4">' +
            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">1</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">线下AI多模态体验</h5>' +
                '<p class="text-gray-600 text-sm mt-1">将传统平面宣传与人工讲解升级为AI多模态智能交互，整合产品图文展示与数字人讲解，实现多语种自然对话的双向客户沟通。</p>' +
              '</div>' +
            '</div>' +

            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">2</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">闭环式AI线下营销流程</h5>' +
                '<p class="text-gray-600 text-sm mt-1">从<strong>"吸引-互动-留资-分析"</strong>全流程由AI驱动完成。系统自动识别客户兴趣点、行为路径引导用户留资，数据分析形成营销数据闭环，助力精准跟进与持续优化。</p>' +
              '</div>' +
            '</div>' +

            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">3</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">软硬一体，全场景交付</h5>' +
                '<p class="text-gray-600 text-sm mt-1">软硬件深度集成设计，一台设备即完成客户接待、内容展示、语音互动、客户留资等全流程，真正实现<strong>"真实世界的AI即插即用"</strong>。适配展会、展厅、门店等多种营销场景。</p>' +
              '</div>' +
            '</div>' +

            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">4</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">极简训练，快速上岗</h5>' +
                '<p class="text-gray-600 text-sm mt-1">后台系统以<strong>"低门槛、高智能"</strong>为设计理念，内置AI辅助训练模块。企业只需上传产品资料，系统即可自动分析学习，生成产品问答库与数字人介绍内容，无额外使用成本。</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',



    },
    'AI Shopping Guide All-in-One Machine': {
      title: 'AI Shopping Guide All-in-One Machine',
      content: '<div class="space-y-6">' +
        '<p class="text-lg font-medium text-gray-800 leading-relaxed">' +
          'AI shopping guide digital human all-in-one machine uses <strong class="text-blue-600">beautiful and dynamic digital human images</strong> to attract customers, uses <strong class="text-blue-600">multi-language natural dialogue</strong> digital human explanations to impress customers, combines customized product knowledge base and scripts to achieve two-way in-depth customer communication, and masters customer preferences and purchase intentions through active data analysis.' +
        '</p>' +

        '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">' +
          '<h4 class="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">' +
            '<i class="fas fa-lightbulb text-blue-600"></i>' +
            'Key Advantages' +
          '</h4>' +
          '<div class="space-y-4">' +
            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">1</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">Offline AI Multimodal Experience</h5>' +
                '<p class="text-gray-600 text-sm mt-1">Upgrade traditional flat promotions and manual explanations to AI multimodal intelligent interaction, integrating product graphic display with digital human explanation, achieving multi-language natural dialogue for two-way customer communication.</p>' +
              '</div>' +
            '</div>' +

            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">2</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">Closed-loop AI Offline Marketing Process</h5>' +
                '<p class="text-gray-600 text-sm mt-1">The entire process from <strong>"attract-interact-collect-analyze"</strong> is AI-driven. The system automatically identifies customer interest points, guides user behavior paths, enables users to leave information, and forms a data closed loop for marketing, assisting in precise follow-up and continuous optimization.</p>' +
              '</div>' +
            '</div>' +

            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">3</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">Software-Hardware Integration, All-Scenario Delivery</h5>' +
                '<p class="text-gray-600 text-sm mt-1">Deep integration design of software and hardware. One device completes the entire process of customer reception, content display, voice interaction, and customer data collection, truly achieving <strong>"plug-and-play AI in the real world"</strong>. Adaptable to exhibition halls, showrooms, stores, and other marketing scenarios.</p>' +
              '</div>' +
            '</div>' +

            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">4</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">Simple Training, Quick Onboarding</h5>' +
                '<p class="text-gray-600 text-sm mt-1">The backend system takes <strong>"low-threshold, high-intelligence"</strong> as the design concept, with built-in AI-assisted training modules. Enterprises only need to upload product materials, and the system can automatically analyze and learn, generate product Q&A databases and digital human introduction content, with no additional usage costs.</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',



    },
    'Máy bán hàng thông minh AI tích hợp tất cả': {
      title: 'Máy bán hàng thông minh AI tích hợp tất cả',
      content: '<div class="space-y-6">' +
        '<p class="text-lg font-medium text-gray-800 leading-relaxed">' +
          'Máy bán hàng hướng dẫn AI nhân vật số tích hợp tất cả sử dụng <strong class="text-blue-600">hình ảnh nhân vật số đẹp đẽ và năng động</strong> để thu hút khách hàng dừng lại, sử dụng <strong class="text-blue-600">giải thích nhân vật số đối thoại tự nhiên đa ngôn ngữ</strong> để gây ấn tượng với khách hàng, kết hợp cơ sở kiến thức sản phẩm tùy chỉnh và kịch bản để đạt được giao tiếp sâu hai chiều với khách hàng, và nắm vững sở thích và ý định mua hàng của khách hàng thông qua phân tích dữ liệu chủ động.' +
        '</p>' +

        '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">' +
          '<h4 class="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">' +
            '<i class="fas fa-lightbulb text-blue-600"></i>' +
            'Ưu thế cốt lõi' +
          '</h4>' +
          '<div class="space-y-4">' +
            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">1</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">Trải nghiệm đa phương thức AI ngoại tuyến</h5>' +
                '<p class="text-gray-600 text-sm mt-1">Nâng cấp quảng cáo phẳng truyền thống và giải thích thủ công thành tương tác thông minh đa phương thức AI, tích hợp hiển thị đồ họa sản phẩm với giải thích nhân vật số, đạt được giao tiếp hai chiều tự nhiên đa ngôn ngữ với khách hàng.</p>' +
              '</div>' +
            '</div>' +

            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">2</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">Quy trình tiếp thị ngoại tuyến AI khép kín</h5>' +
                '<p class="text-gray-600 text-sm mt-1">Toàn bộ quy trình từ <strong>"thu hút-tương tác-thu thập-phân tích"</strong> được điều khiển bởi AI. Hệ thống tự động xác định điểm quan tâm của khách hàng, hướng dẫn đường dẫn hành vi người dùng, cho phép người dùng để lại thông tin, và hình thành vòng khép kín dữ liệu tiếp thị, hỗ trợ theo dõi chính xác và tối ưu hóa liên tục.</p>' +
              '</div>' +
            '</div>' +

            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">3</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">Tích hợp phần mềm-phần cứng, giao hàng tất cả kịch bản</h5>' +
                '<p class="text-gray-600 text-sm mt-1">Thiết kế tích hợp sâu phần mềm và phần cứng. Một thiết bị hoàn thành toàn bộ quy trình tiếp đón khách hàng, hiển thị nội dung, tương tác giọng nói và thu thập dữ liệu khách hàng, thực sự đạt được <strong>"AI cắm là chạy trong thế giới thực"</strong>. Phù hợp với hội chợ, phòng trưng bày, cửa hàng và các kịch bản tiếp thị khác.</p>' +
              '</div>' +
            '</div>' +

            '<div class="flex items-start gap-3">' +
              '<span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[24px] text-center">4</span>' +
              '<div>' +
                '<h5 class="font-semibold text-gray-900">Đào tạo đơn giản, onboard nhanh chóng</h5>' +
                '<p class="text-gray-600 text-sm mt-1">Hệ thống backend lấy <strong>"ngưỡng thấp, trí thông minh cao"</strong> làm khái niệm thiết kế, với các mô-đun hỗ trợ đào tạo AI tích hợp. Doanh nghiệp chỉ cần tải lên tài liệu sản phẩm, hệ thống có thể tự động phân tích và học, tạo cơ sở dữ liệu Q&A sản phẩm và nội dung giới thiệu nhân vật số, không có chi phí sử dụng bổ sung.</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',



    },
    'Gephura 数字员工平台': {
      title: 'Gephura 数字员工平台',
      content: '<div class="space-y-6">' +
        '<p class="text-lg font-medium text-gray-800 leading-relaxed">' +
          '只需<strong class="text-blue-600">三步</strong>，您的AI数字员工即可<strong class="text-blue-600">快速上岗</strong>：' +
        '</p>' +

        '<div class="space-y-6">' +
          '<div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-green-800 mb-3">便捷创建产品库</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-green-600 mt-1"></i>' +
                    '<span class="text-gray-700">拖拽上传产品资料，AI自动完成<strong>信息解析与问答库生成</strong></span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-green-600 mt-1"></i>' +
                    '<span class="text-gray-700">支持<strong>自动多语种翻译</strong>与内容优化</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-green-600 mt-1"></i>' +
                    '<span class="text-gray-700">多模态展示产品（图文、视频、<strong>3D模型</strong>等）</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-blue-800 mb-3">聘用并培训数字员工</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-blue-600 mt-1"></i>' +
                    '<span class="text-gray-700">平台提供<strong>多样化数字员工形象</strong>（不同风格、性格、表现力）</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-blue-600 mt-1"></i>' +
                    '<span class="text-gray-700">企业可选择符合品牌调性的数字人，<strong>30分钟</strong>即可完成培训上岗</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-blue-600 mt-1"></i>' +
                    '<span class="text-gray-700">具备<strong>循环学习能力</strong>，越用越智能</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-purple-800 mb-3">个性化场景设定，开启营销活动</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-purple-600 mt-1"></i>' +
                    '<span class="text-gray-700">支持展会、门店、展厅等<strong>多种应用场景</strong></span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-purple-600 mt-1"></i>' +
                    '<span class="text-gray-700">自定义产品展示与数字人对话行为风格</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-purple-600 mt-1"></i>' +
                    '<span class="text-gray-700">打造<strong>高度贴合场景</strong>的互动体验</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-orange-800 mb-3">活动复盘，销售转化</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-orange-600 mt-1"></i>' +
                    '<span class="text-gray-700">详细分析每位客户的<strong>互动行为与意向</strong></span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-orange-600 mt-1"></i>' +
                    '<span class="text-gray-700">数据直连CRM，<strong>精准线索转化</strong></span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-orange-600 mt-1"></i>' +
                    '<span class="text-gray-700">助力企业实现<strong>高效销售增长</strong></span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',



    },
    'Gephura Digital Employee Platform': {
      title: 'Gephura Digital Employee Platform',
      content: '<div class="space-y-6">' +
        '<p class="text-lg font-medium text-gray-800 leading-relaxed">' +
          'Just <strong class="text-blue-600">three steps</strong> for your AI digital employee to go <strong class="text-blue-600">online quickly</strong>:' +
        '</p>' +

        '<div class="space-y-6">' +
          '<div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-green-800 mb-3">Convenient Product Library Creation</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-green-600 mt-1"></i>' +
                    '<span class="text-gray-700">Drag and drop to upload product materials, AI automatically completes <strong>information parsing and Q&A database generation</strong></span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-green-600 mt-1"></i>' +
                    '<span class="text-gray-700">Support <strong>automatic multi-language translation</strong> and content optimization</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-green-600 mt-1"></i>' +
                    '<span class="text-gray-700">Multi-modal product display (graphics, videos, <strong>3D models</strong>, etc.)</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-blue-800 mb-3">Hire and Train Digital Employees</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-blue-600 mt-1"></i>' +
                    '<span class="text-gray-700">The platform provides <strong>diverse digital employee images</strong> (different styles, personalities, expressiveness)</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-blue-600 mt-1"></i>' +
                    '<span class="text-gray-700">Enterprises can choose digital humans that match brand tonality, <strong>30 minutes</strong> to complete training and onboarding</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-blue-600 mt-1"></i>' +
                    '<span class="text-gray-700">Possess <strong>cyclic learning ability</strong>, gets smarter the more it\'s used</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-purple-800 mb-3">Personalized Scenario Settings, Launch Marketing Activities</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-purple-600 mt-1"></i>' +
                    '<span class="text-gray-700">Supports exhibition halls, stores, showrooms and <strong>various application scenarios</strong></span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-purple-600 mt-1"></i>' +
                    '<span class="text-gray-700">Customize product display and digital human dialogue behavior style</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-purple-600 mt-1"></i>' +
                    '<span class="text-gray-700">Create <strong>highly fitting interactive experiences</strong> for scenarios</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-orange-800 mb-3">Activity Review, Sales Conversion</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-orange-600 mt-1"></i>' +
                    '<span class="text-gray-700">Detailed analysis of each customer\'s <strong>interactive behavior and intentions</strong></span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-orange-600 mt-1"></i>' +
                    '<span class="text-gray-700">Data directly connected to CRM, <strong>precise lead conversion</strong></span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-orange-600 mt-1"></i>' +
                    '<span class="text-gray-700">Assist enterprises in achieving <strong>efficient sales growth</strong></span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',



    },
    'Nền tảng nhân viên số Gephura': {
      title: 'Nền tảng nhân viên số Gephura',
      content: '<div class="space-y-6">' +
        '<p class="text-lg font-medium text-gray-800 leading-relaxed">' +
          'Chỉ cần <strong class="text-blue-600">ba bước</strong>, nhân viên số AI của bạn có thể <strong class="text-blue-600">nhanh chóng đi vào hoạt động</strong>:' +
        '</p>' +

        '<div class="space-y-6">' +
          '<div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-green-800 mb-3">Tạo thư viện sản phẩm tiện lợi</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-green-600 mt-1"></i>' +
                    '<span class="text-gray-700">Kéo thả tải lên tài liệu sản phẩm, AI tự động hoàn thành <strong>phân tích thông tin và tạo cơ sở dữ liệu Q&A</strong></span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-green-600 mt-1"></i>' +
                    '<span class="text-gray-700">Hỗ trợ <strong>dịch tự động đa ngôn ngữ</strong> và tối ưu hóa nội dung</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-green-600 mt-1"></i>' +
                    '<span class="text-gray-700">Hiển thị sản phẩm đa phương thức (đồ họa, video, <strong>mô hình 3D</strong>, v.v.)</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-blue-800 mb-3">Tuyển dụng và đào tạo nhân viên số</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-blue-600 mt-1"></i>' +
                    '<span class="text-gray-700">Nền tảng cung cấp <strong>hình ảnh nhân viên số đa dạng</strong> (kiểu dáng, tính cách, biểu đạt khác nhau)</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-blue-600 mt-1"></i>' +
                    '<span class="text-gray-700">Doanh nghiệp có thể chọn nhân vật số phù hợp với tông màu thương hiệu, <strong>30 phút</strong> hoàn thành đào tạo và onboard</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-blue-600 mt-1"></i>' +
                    '<span class="text-gray-700">Sở hữu <strong>khả năng học tập tuần hoàn</strong>, càng dùng càng thông minh</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-purple-800 mb-3">Thiết lập kịch bản cá nhân hóa, khởi động hoạt động tiếp thị</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-purple-600 mt-1"></i>' +
                    '<span class="text-gray-700">Hỗ trợ hội chợ, cửa hàng, phòng trưng bày và <strong>các kịch bản ứng dụng khác</strong></span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-purple-600 mt-1"></i>' +
                    '<span class="text-gray-700">Tùy chỉnh hiển thị sản phẩm và phong cách hành vi đối thoại nhân vật số</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-purple-600 mt-1"></i>' +
                    '<span class="text-gray-700">Tạo <strong>trải nghiệm tương tác phù hợp cao</strong> với kịch bản</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-xl font-bold text-orange-800 mb-3">Tổng kết hoạt động, chuyển đổi bán hàng</h4>' +
                '<div class="space-y-2">' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-orange-600 mt-1"></i>' +
                    '<span class="text-gray-700">Phân tích chi tiết <strong>hành vi tương tác và ý định</strong> của từng khách hàng</span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-orange-600 mt-1"></i>' +
                    '<span class="text-gray-700">Dữ liệu kết nối trực tiếp với CRM, <strong>chuyển đổi lead chính xác</strong></span>' +
                  '</div>' +
                  '<div class="flex items-start gap-2">' +
                    '<i class="fas fa-check text-orange-600 mt-1"></i>' +
                    '<span class="text-gray-700">Hỗ trợ doanh nghiệp đạt được <strong>tăng trưởng bán hàng hiệu quả</strong></span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',



    },
    '全景定制服务': {
      title: '全景定制服务',
      content: '<div class="space-y-6">' +
        '<p class="text-lg font-medium text-gray-800 leading-relaxed">' +
          '数字化展示不同的产品，不同的企业，需要<strong class="text-blue-600">更加个性化的定制方案</strong>：' +
        '</p>' +

        '<div class="grid md:grid-cols-2 gap-6">' +
          '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-user-tie"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-blue-800 mb-2">数字员工定制</h4>' +
                '<p class="text-gray-700 text-sm">结合企业品牌调性，打造<strong>专属品牌数字人形象</strong>与互动风格</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-bullhorn"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-green-800 mb-2">宣传内容与训练代运营</h4>' +
                '<p class="text-gray-700 text-sm">专业团队<strong>一对一服务</strong>，代为生成、训练与优化内容</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-tv"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-purple-800 mb-2">展示设备定制</h4>' +
                '<p class="text-gray-700 text-sm">提供<strong>大尺寸、半透明、裸眼3D</strong>等多样化硬件形态，匹配不同线下营销场景</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-draw-polygon"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-orange-800 mb-2">全场景AI营销设计</h4>' +
                '<p class="text-gray-700 text-sm">根据展会、门店、展厅等场景，完整设计AI线下营销方案，<strong>无死角全面AI升级</strong></p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200">' +
          '<h4 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">' +
            '<i class="fas fa-cogs text-gray-600"></i>' +
            '定制服务流程' +
          '</h4>' +
          '<div class="grid md:grid-cols-4 gap-4">' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">1</div>' +
              '<p class="text-sm font-medium text-gray-700">需求分析</p>' +
            '</div>' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">2</div>' +
              '<p class="text-sm font-medium text-gray-700">方案设计</p>' +
            '</div>' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">3</div>' +
              '<p class="text-sm font-medium text-gray-700">定制开发</p>' +
            '</div>' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">4</div>' +
              '<p class="text-sm font-medium text-gray-700">部署上线</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',



    },
    'Comprehensive Customization Services': {
      title: 'Comprehensive Customization Services',
      content: '<div class="space-y-6">' +
        '<p class="text-lg font-medium text-gray-800 leading-relaxed">' +
          'Different products and different enterprises need <strong class="text-blue-600">more personalized customized solutions</strong>:' +
        '</p>' +

        '<div class="grid md:grid-cols-2 gap-6">' +
          '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-user-tie"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-blue-800 mb-2">Digital Employee Customization</h4>' +
                '<p class="text-gray-700 text-sm">Integrate with enterprise brand tonality to create <strong>exclusive brand digital human images</strong> and interactive styles</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-bullhorn"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-green-800 mb-2">Content & Training Outsourcing</h4>' +
                '<p class="text-gray-700 text-sm">Professional team <strong>one-on-one service</strong>, help generate, train and optimize content</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-tv"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-purple-800 mb-2">Display Device Customization</h4>' +
                '<p class="text-gray-700 text-sm">Provide <strong>large-size, semi-transparent, naked-eye 3D</strong> and other diversified hardware forms to match different offline marketing scenarios</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-draw-polygon"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-orange-800 mb-2">All-Scenario AI Marketing Design</h4>' +
                '<p class="text-gray-700 text-sm">Design complete AI offline marketing solutions based on exhibitions, stores, showrooms and other scenarios, <strong>comprehensive AI upgrades without dead ends</strong></p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200">' +
          '<h4 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">' +
            '<i class="fas fa-cogs text-gray-600"></i>' +
            'Customization Service Process' +
          '</h4>' +
          '<div class="grid md:grid-cols-4 gap-4">' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">1</div>' +
              '<p class="text-sm font-medium text-gray-700">Requirements Analysis</p>' +
            '</div>' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">2</div>' +
              '<p class="text-sm font-medium text-gray-700">Solution Design</p>' +
            '</div>' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">3</div>' +
              '<p class="text-sm font-medium text-gray-700">Custom Development</p>' +
            '</div>' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">4</div>' +
              '<p class="text-sm font-medium text-gray-700">Deployment & Launch</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',



    },
    'Dịch vụ tùy chỉnh toàn diện': {
      title: 'Dịch vụ tùy chỉnh toàn diện',
      content: '<div class="space-y-6">' +
        '<p class="text-lg font-medium text-gray-800 leading-relaxed">' +
          'Trưng bày số hóa các sản phẩm khác nhau, các doanh nghiệp khác nhau, cần <strong class="text-blue-600">các giải pháp tùy chỉnh cá nhân hóa hơn</strong>:' +
        '</p>' +

        '<div class="grid md:grid-cols-2 gap-6">' +
          '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-user-tie"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-blue-800 mb-2">Tùy chỉnh nhân viên số</h4>' +
                '<p class="text-gray-700 text-sm">Tích hợp với tông màu thương hiệu doanh nghiệp, tạo <strong>hình ảnh và phong cách tương tác nhân vật số thương hiệu độc quyền</strong></p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-bullhorn"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-green-800 mb-2">Nội dung tuyên truyền & đào tạo đại diện</h4>' +
                '<p class="text-gray-700 text-sm">Đội ngũ chuyên nghiệp <strong>phục vụ một kèm một</strong>, đại diện tạo, đào tạo và tối ưu hóa nội dung</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-tv"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-purple-800 mb-2">Tùy chỉnh thiết bị hiển thị</h4>' +
                '<p class="text-gray-700 text-sm">Cung cấp <strong>kích thước lớn, bán trong suốt, 3D không kính</strong> và các dạng phần cứng đa dạng khác để phù hợp với các kịch bản tiếp thị ngoại tuyến khác nhau</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-500">' +
            '<div class="flex items-start gap-4">' +
              '<div class="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">' +
                '<i class="fas fa-draw-polygon"></i>' +
              '</div>' +
              '<div class="flex-1">' +
                '<h4 class="text-lg font-bold text-orange-800 mb-2">Thiết kế tiếp thị AI toàn kịch bản</h4>' +
                '<p class="text-gray-700 text-sm">Thiết kế hoàn chỉnh giải pháp tiếp thị ngoại tuyến AI dựa trên hội chợ, cửa hàng, phòng trưng bày và các kịch bản khác, <strong>nâng cấp AI toàn diện không có điểm chết</strong></p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200">' +
          '<h4 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">' +
            '<i class="fas fa-cogs text-gray-600"></i>' +
            'Quy trình dịch vụ tùy chỉnh' +
          '</h4>' +
          '<div class="grid md:grid-cols-4 gap-4">' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">1</div>' +
              '<p class="text-sm font-medium text-gray-700">Phân tích nhu cầu</p>' +
            '</div>' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">2</div>' +
              '<p class="text-sm font-medium text-gray-700">Thiết kế giải pháp</p>' +
            '</div>' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">3</div>' +
              '<p class="text-sm font-medium text-gray-700">Phát triển tùy chỉnh</p>' +
            '</div>' +
            '<div class="text-center">' +
              '<div class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">4</div>' +
              '<p class="text-sm font-medium text-gray-700">Triển khai ra mắt</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',



    }
  };
  currentService.value = serviceDetails[service.title as keyof typeof serviceDetails];
  showServiceModal.value = true;
};

// 获取服务图片
const getServiceImage = (title: string) => {
  const imageMap = {
    'AI 导购一体机': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/All-in-One-Machine.svg',
    'AI Shopping Assistant All-in-One Kiosk': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/All-in-One-Machine.svg',
    'Gephura 数字员工平台': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Digital-Employee-Platform.svg',
    '全景定制服务': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Comprehensive-Customization-Services.svg',
    'AI Shopping Guide All-in-One Machine': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/All-in-One-Machine.svg',
    'Gephura Digital Employee Platform': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Digital-Employee-Platform.svg',
    'Comprehensive Customization Services': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Comprehensive-Customization-Services.svg',
    'Máy bán hàng thông minh AI tích hợp tất cả': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/All-in-One-Machine.svg',
    'Nền tảng nhân viên số Gephura': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Digital-Employee-Platform.svg',
    'Dịch vụ tùy chỉnh toàn diện': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Comprehensive-Customization-Services.svg'
  };
  return imageMap[title as keyof typeof imageMap];
};

// 获取案例图片
const getCaseImage = (title: string) => {
  const imageMap = {
    '全球展会': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Global-Exhibitions.svg',
    '品牌门店': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Brand-Stores.svg',
    '服务大厅': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Service-Halls.svg',
    'Global Exhibitions': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Global-Exhibitions.svg',
    'Brand Stores': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Brand-Stores.svg',
    'Service Halls': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Service-Halls.svg',
    'Hội chợ toàn cầu': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Global-Exhibitions.svg',
    'Cửa hàng thương hiệu': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Brand-Stores.svg',
    'Sảnh dịch vụ': 'https://gephura-web.oss-cn-shanghai.aliyuncs.com/Service-Halls.svg'
  };
  return imageMap[title as keyof typeof imageMap];
};

const toggleLangMenu = () => {
  isLangMenuOpen.value = !isLangMenuOpen.value;
};

// 点击外部关闭下拉菜单
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative')) {
      isLangMenuOpen.value = false;
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('click', () => {});
});

// 监听滚动
window.addEventListener('scroll', () => {
  showBackTop.value = window.scrollY > 300;
});
</script>
<style scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 移动端滑动菜单动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* 确保移动端触摸滑动顺滑 */
@media (max-width: 768px) {
  * {
    -webkit-tap-highlight-color: transparent;
  }

  .smooth-scroll {
    -webkit-overflow-scrolling: touch;
  }
}

/* 英雄区域视频样式 */
.hero-video {
  transition: opacity 0.5s ease-in-out;
}

/* 视频加载动画 */
@keyframes videoFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.hero-video {
  animation: videoFadeIn 0.5s ease-in-out;
}
</style>