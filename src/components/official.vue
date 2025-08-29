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
    <div class="relative h-[600px] md:h-[600px] h-[500px] pt-20 w-full" style="top: 50px;">
      <img :src="heroImage" alt="AI Innovation" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
        <div class="w-full px-6">
          <h1 class="md:text-5xl text-3xl font-bold text-white mb-6">{{ i18n[currentLang].hero.title }}</h1>
          <p class="md:text-xl text-lg text-white/90 mb-8 max-w-2xl">{{ i18n[currentLang].hero.subtitle }}</p>
          <button @click="scrollToSection('contact')"
            class="!rounded-button bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 text-lg hover:from-blue-700 hover:to-blue-900 transition-all whitespace-nowrap group flex items-center gap-3">
            {{ i18n[currentLang].hero.cta }}
            <i class="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform"></i>
          </button>
        </div>
      </div>
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
              <div v-if="showServiceModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div class="bg-white rounded-xl w-[800px] max-h-[90vh] overflow-y-auto">
                  <div class="p-8">
                    <div class="flex justify-between items-center mb-6">
                      <h3 class="text-2xl font-bold">{{ currentService.title }}</h3>
                      <button @click="showServiceModal = false" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                      </button>
                    </div>
                    <p class="text-gray-600 leading-relaxed mb-8">{{ currentService.content }}</p>
                    <div class="space-y-2 mb-8">
                      <div v-for="(feature, index) in currentService.features" :key="index"
                        class="flex items-start gap-3">
                        <i class="fas fa-check-circle text-green-500 mt-1"></i>
                        <span class="text-gray-700">{{ feature }}</span>
                      </div>
                    </div>
                    <!-- 流程/模块展示 -->
                    <div v-if="currentService.process.length > 0" class="mb-8">
                      <div class="flex items-center justify-between relative">
                        <div v-for="(step, index) in currentService.process" :key="index"
                          class="flex-1 text-center relative z-10">
                          <div
                            class="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                            <i class="fas" :class="getProcessIcon(index)"></i>
                          </div>
                          <h4 class="font-semibold mb-1">{{ step.title }}</h4>
                          <p class="text-sm text-gray-500">{{ step.desc }}</p>
                        </div>
                        <div class="absolute top-6 left-0 w-full h-0.5 bg-blue-100"></div>
                      </div>
                    </div>
                    <!-- 色块展示 -->
                    <div v-if="currentService.blocks.length > 0" class="grid grid-cols-3 gap-6">
                      <div v-for="(block, index) in currentService.blocks" :key="index"
                        class="bg-gradient-to-br p-6 rounded-lg" :class="getBlockColor(index)">
                        <h4 class="font-semibold text-white mb-2">{{ block.title }}</h4>
                        <p class="text-white/90 text-sm">{{ block.desc }}</p>
                      </div>
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
            <div class="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <i class="fas fa-phone text-blue-600 text-2xl mb-4"></i>
              <span class="text-gray-700 font-medium">{{ currentLang === 'en' ? 'Phone' : currentLang === 'cn' ? '联系电话' : 'Điện thoại' }}</span>
              <a href="tel:+8619821902019" class="text-blue-600 hover:text-blue-800 mt-2">+86 198-2190-2019</a>
            </div>
            <div class="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <i class="fas fa-envelope text-blue-600 text-2xl mb-4"></i>
              <span class="text-gray-700 font-medium">{{ currentLang === 'en' ? 'Email' : currentLang === 'cn' ? '电子邮箱' : 'Email' }}</span>
              <a href="mailto:info@gephura.cn" class="text-blue-600 hover:text-blue-800 mt-2">info@gephura.cn</a>
            </div>
            <div class="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <i class="fas fa-map-marker-alt text-blue-600 text-2xl mb-4"></i>
              <span class="text-gray-700 font-medium">{{ currentLang === 'en' ? 'Address' : currentLang === 'cn' ? '公司地址' : 'Địa chỉ' }}</span>
              <span class="text-gray-600 text-center mt-2">{{ 
                currentLang === 'en' ? '3rd Floor, Huaqiang Building, 151 Keyuan Road, Zhangjiang Hi-Tech Park, Pudong New Area, Shanghai, China' : 
                currentLang === 'cn' ? '上海市浦东新区张江高科科苑路151号华强大厦三楼' :
                'Technopark Tower, XWQR+FV, Vinhomes Ocean Park, Gia Lam, Ha Noi, Vietnam'
              }}</span>
            </div>
          </div>
          <div class="mt-12 flex flex-col items-center">
            <h3 class="text-xl font-semibold mb-6">{{ 
              currentLang === 'en' ? 'Scan QR Code to Add WeChat' : 
              currentLang === 'cn' ? '扫码添加企业微信' :
              'Quét mã QR để thêm WeChat doanh nghiệp'
            }}</h3>
            <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <img src="/src/assets/wechat-qr.png" :alt="currentLang === 'en' ? 'WeChat QR Code' : currentLang === 'cn' ? '企业微信二维码' : 'Mã QR WeChat doanh nghiệp'" class="w-40 h-40 object-contain">
              <p class="text-gray-500 text-sm mt-4 text-center">{{ 
                currentLang === 'en' ? 'Scan to contact us' : 
                currentLang === 'cn' ? '扫一扫，立即咨询' :
                'Quét để liên hệ với chúng tôi'
              }}</p>
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
const logoUrl = '/src/assets/web-logo.svg';

const currentNav = ref('home');
const showServiceModal = ref(false);
const currentService = ref({
  title: '',
  content: '',
  features: [] as string[],
  process: [] as { title: string; desc: string }[],
  blocks: [] as { title: string; desc: string }[]
});
const showBackTop = ref(false);
type Language = 'en' | 'cn' | 'vi';
const currentLang = ref<Language>('en');
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
const heroImage = 'https://public.readdy.ai/ai/img_res/1755778b77a0e79d2ec06e0b82414bf2.jpg';
const aboutImage = 'https://public.readdy.ai/ai/img_res/54c76814d2ff0793cc44840583d0d590.jpg';

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

const getProcessIcon = (index: number) => {
  const icons = ['fa-chart-line', 'fa-filter', 'fa-rocket'];
  return icons[index];
};

const getBlockColor = (index: number) => {
  const colors = [
    'from-blue-500 to-blue-700',
    'from-purple-500 to-purple-700',
    'from-green-500 to-green-700'
  ];
  return colors[index];
};

const showServiceDetails = (service: any) => {
  const serviceDetails = {
    'AI 导购一体机': {
      title: 'AI 导购一体机',
      content: 'AI导购数字人一体机，用靓丽灵动的数字人形象吸引客户驻足，用多语种自然对话的数字人讲解，结合产品多模态展示打动客户，用定制化的产品知识库和话术实现客户双向深度沟通，并通过主动数据分析掌握客户偏好与购买意向。\n\n' +
        '1. 线下AI多模态体验<br>' +
        '将传统平面宣传与人工讲解升级为AI多模态智能交互，整合产品图文展示与数字人讲解，实现多语种自然对话的双向客户沟通。\n\n' +
        '2. 闭环式AI线下营销流程\n' +
        '从“吸引-互动-留资-分析”全流程由AI驱动完成。系统自动识别客户兴趣点、行为路径引导用户留资，数据分析形成营销数据闭环，助力精准跟进与持续优化。\n\n' +
        '3. 软硬一体，全场景交付\n' +
        '软硬件深度集成设计，一台设备即完成客户接待、内容展示、语音互动、客户留资等全流程，真正实现“真实世界的AI即插即用”。适配展会、展厅、门店等多种营销场景。\n\n' +
        '4. 极简训练，快速上岗\n' +
        '后台系统以"低门槛、高智能"为设计理念，内置AI辅助训练模块。企业只需上传产品资料，系统即可自动分析学习，生成产品问答库与数字人介绍内容，无额外使用成本。',
      features: [
      ],
      process: [
        { title: '业务流程评估', desc: '评估企业数字化基础' },
        { title: '场景筛选', desc: '确定AI应用潜力领域' },
        { title: '快速验证', desc: '12周内验证方案可行性' }
      ],
      blocks: []
    },
    'AI Shopping Guide All-in-One Machine': {
      title: 'AI Shopping Guide All-in-One Machine',
      content: 'AI shopping guide digital human all-in-one machine uses beautiful and dynamic digital human images to attract customers, uses multi-language natural dialogue digital human explanations to impress customers, combines customized product knowledge base and scripts to achieve two-way in-depth customer communication, and masters customer preferences and purchase intentions through active data analysis.\n\n' +
        '1. Offline AI multimodal experience<br>' +
        'Upgrade traditional flat promotions and manual explanations to AI multimodal intelligent interaction, integrating product graphic display with digital human explanation, achieving multi-language natural dialogue for two-way customer communication.\n\n' +
        '2. Closed-loop AI offline marketing process<br>' +
        'The entire process from "attract-interact-collect-analyze" is AI-driven. The system automatically identifies customer interest points, guides user behavior paths, enables users to leave information, and forms a data closed loop for marketing, assisting in precise follow-up and continuous optimization.\n\n' +
        '3. Software-hardware integration, all-scenario delivery<br>' +
        'Deep integration design of software and hardware. One device completes the entire process of customer reception, content display, voice interaction, and customer data collection, truly achieving "plug-and-play AI in the real world". Adaptable to exhibition halls, showrooms, stores, and other marketing scenarios.\n\n' +
        '4. Simple training, quick onboarding<br>' +
        'The backend system takes "low-threshold, high-intelligence" as the design concept, with built-in AI-assisted training modules. Enterprises only need to upload product materials, and the system can automatically analyze and learn, generate product Q&A databases and digital human introduction content, with no additional usage costs.',
      features: [
      ],
      process: [
        { title: 'Business Process Assessment', desc: 'Assess enterprise digital foundation' },
        { title: 'Scenario Screening', desc: 'Determine AI application potential areas' },
        { title: 'Rapid Validation', desc: 'Validate solution feasibility within 12 weeks' }
      ],
      blocks: []
    },
    'Máy bán hàng thông minh AI tích hợp tất cả': {
      title: 'Máy bán hàng thông minh AI tích hợp tất cả',
      content: 'Máy bán hàng hướng dẫn AI nhân vật số tích hợp tất cả sử dụng hình ảnh nhân vật số đẹp đẽ và năng động để thu hút khách hàng dừng lại, sử dụng giải thích nhân vật số đối thoại tự nhiên đa ngôn ngữ để gây ấn tượng với khách hàng, kết hợp cơ sở kiến thức sản phẩm tùy chỉnh và kịch bản để đạt được giao tiếp sâu hai chiều với khách hàng, và nắm vững sở thích và ý định mua hàng của khách hàng thông qua phân tích dữ liệu chủ động.\n\n' +
        '1. Trải nghiệm đa phương thức AI ngoại tuyến<br>' +
        'Nâng cấp quảng cáo phẳng truyền thống và giải thích thủ công thành tương tác thông minh đa phương thức AI, tích hợp hiển thị đồ họa sản phẩm với giải thích nhân vật số, đạt được giao tiếp hai chiều tự nhiên đa ngôn ngữ với khách hàng.\n\n' +
        '2. Quy trình tiếp thị ngoại tuyến AI khép kín<br>' +
        'Toàn bộ quy trình từ "thu hút-tương tác-thu thập-phân tích" được điều khiển bởi AI. Hệ thống tự động xác định điểm quan tâm của khách hàng, hướng dẫn đường dẫn hành vi người dùng, cho phép người dùng để lại thông tin, và hình thành vòng khép kín dữ liệu tiếp thị, hỗ trợ theo dõi chính xác và tối ưu hóa liên tục.\n\n' +
        '3. Tích hợp phần mềm-phần cứng, giao hàng tất cả kịch bản<br>' +
        'Thiết kế tích hợp sâu phần mềm và phần cứng. Một thiết bị hoàn thành toàn bộ quy trình tiếp đón khách hàng, hiển thị nội dung, tương tác giọng nói và thu thập dữ liệu khách hàng, thực sự đạt được "AI cắm là chạy trong thế giới thực". Phù hợp với hội chợ, phòng trưng bày, cửa hàng và các kịch bản tiếp thị khác.\n\n' +
        '4. Đào tạo đơn giản, onboard nhanh chóng<br>' +
        'Hệ thống backend lấy "ngưỡng thấp, trí thông minh cao" làm khái niệm thiết kế, với các mô-đun hỗ trợ đào tạo AI tích hợp. Doanh nghiệp chỉ cần tải lên tài liệu sản phẩm, hệ thống có thể tự động phân tích và học, tạo cơ sở dữ liệu Q&A sản phẩm và nội dung giới thiệu nhân vật số, không có chi phí sử dụng bổ sung.',
      features: [
      ],
      process: [
        { title: 'Đánh giá quy trình kinh doanh', desc: 'Đánh giá nền tảng số của doanh nghiệp' },
        { title: 'Sàng lọc kịch bản', desc: 'Xác định lĩnh vực tiềm năng ứng dụng AI' },
        { title: 'Xác thực nhanh', desc: 'Xác thực tính khả thi giải pháp trong 12 tuần' }
      ],
      blocks: []
    },
    'Gephura 数字员工平台': {
      title: 'Gephura 数字员工平台',
      content: '只需 三步，您的AI数字员工即可快速上岗：\n' +
      '- 便捷创建产品库\n' +
      '  - 拖拽上传产品资料，AI自动完成信息解析与问答库生成\n' +
      '  - 支持自动多语种翻译与内容优化\n' +
      '  - 多模态展示产品（图文、视频、3D模型等）\n' +
      '- 聘用并培训数字员工\n' +
      '  - 平台提供多样化数字员工形象（不同风格、性格、表现力）\n' +
      '  - 企业可选择符合品牌调性的数字人，30分钟即可完成培训上岗\n' +
      '  - 具备循环学习能力，越用越智能\n' +
      '- 个性化场景设定，开启营销活动\n' +
      '  - 支持展会、门店、展厅等多种应用场景\n' +
      '  - 自定义产品展示与数字人对话行为风格\n' +
      '  - 打造高度贴合场景的互动体验\n' +
      '- 活动复盘，销售转化\n' +
      '  - 详细分析每位客户的互动行为与意向\n' +
      '  - 数据直连CRM，精准线索转化\n' +
      '  - 助力企业实现高效销售增长' ,
      features: [
      ],
      process: [],
      blocks: [
        { title: '模块化', desc: '快速搭建，灵活组合' },
        { title: '渐进式', desc: 'MVP验证，逐步集成' },
        { title: '定制化', desc: '满足特定业务需求' }
      ]
    },
    'Gephura Digital Employee Platform': {
      title: 'Gephura Digital Employee Platform',
      content: 'Just three steps for your AI digital employee to go online quickly:\n' +
      '- Convenient product library creation\n' +
      '  - Drag and drop to upload product materials, AI automatically completes information parsing and Q&A database generation\n' +
      '  - Support automatic multi-language translation and content optimization\n' +
      '  - Multi-modal product display (graphics, videos, 3D models, etc.)\n' +
      '- Hire and train digital employees\n' +
      '  - The platform provides diverse digital employee images (different styles, personalities, expressiveness)\n' +
      '  - Enterprises can choose digital humans that match brand tonality, 30 minutes to complete training and onboarding\n' +
      '  - Possess cyclic learning ability, gets smarter the more it\'s used\n' +
      '- Personalized scenario settings, launch marketing activities\n' +
      '  - Supports exhibition halls, stores, showrooms and other application scenarios\n' +
      '  - Customize product display and digital human dialogue behavior style\n' +
      '  - Create highly fitting interactive experiences for scenarios\n' +
      '- Activity review, sales conversion\n' +
      '  - Detailed analysis of each customer\'s interactive behavior and intentions\n' +
      '  - Data directly connected to CRM, precise lead conversion\n' +
      '  - Assist enterprises in achieving efficient sales growth',
      features: [
      ],
      process: [],
      blocks: [
        { title: 'Modular', desc: 'Rapid assembly, flexible combination' },
        { title: 'Progressive', desc: 'MVP validation, gradual integration' },
        { title: 'Customized', desc: 'Satisfy specific business needs' }
      ]
    },
    'Nền tảng nhân viên số Gephura': {
      title: 'Nền tảng nhân viên số Gephura',
      content: 'Chỉ cần ba bước, nhân viên số AI của bạn có thể nhanh chóng đi vào hoạt động:\n' +
      '- Tạo thư viện sản phẩm tiện lợi\n' +
      '  - Kéo thả tải lên tài liệu sản phẩm, AI tự động hoàn thành phân tích thông tin và tạo cơ sở dữ liệu Q&A\n' +
      '  - Hỗ trợ dịch tự động đa ngôn ngữ và tối ưu hóa nội dung\n' +
      '  - Hiển thị sản phẩm đa phương thức (đồ họa, video, mô hình 3D, v.v.)\n' +
      '- Tuyển dụng và đào tạo nhân viên số\n' +
      '  - Nền tảng cung cấp hình ảnh nhân viên số đa dạng (kiểu dáng, tính cách, biểu đạt khác nhau)\n' +
      '  - Doanh nghiệp có thể chọn nhân vật số phù hợp với tông màu thương hiệu, 30 phút hoàn thành đào tạo và onboard\n' +
      '  - Sở hữu khả năng học tập tuần hoàn, càng dùng càng thông minh\n' +
      '- Thiết lập kịch bản cá nhân hóa, khởi động hoạt động tiếp thị\n' +
      '  - Hỗ trợ hội chợ, cửa hàng, phòng trưng bày và các kịch bản ứng dụng khác\n' +
      '  - Tùy chỉnh hiển thị sản phẩm và phong cách hành vi đối thoại nhân vật số\n' +
      '  - Tạo trải nghiệm tương tác phù hợp cao với kịch bản\n' +
      '- Tổng kết hoạt động, chuyển đổi bán hàng\n' +
      '  - Phân tích chi tiết hành vi tương tác và ý định của từng khách hàng\n' +
      '  - Dữ liệu kết nối trực tiếp với CRM, chuyển đổi lead chính xác\n' +
      '  - Hỗ trợ doanh nghiệp đạt được tăng trưởng bán hàng hiệu quả',
      features: [
      ],
      process: [],
      blocks: [
        { title: 'Mô-đun', desc: 'Xây dựng nhanh, kết hợp linh hoạt' },
        { title: 'Tiến bộ', desc: 'Xác thực MVP, tích hợp dần dần' },
        { title: 'Tùy chỉnh', desc: 'Đáp ứng nhu cầu kinh doanh cụ thể' }
      ]
    },
    '全景定制服务': {
      title: '全景定制服务',
      content: '数字化展示不同的产品，不同的企业，需要更加个性化的定制方案：\n' +
      '- 数字员工定制：结合企业品牌调性，打造专属品牌数字人形象与互动风格\n' +
      '- 宣传内容与训练代运营：专业团队一对一服务，代为生成、训练与优化内容\n' +
      '- 展示设备定制：提供大尺寸，半透明，裸眼3D等多样化硬件形态，匹配不同线下营销场景\n' +
      '- 全场景AI营销设计：根据展会、门店、展厅等场景，完整设计AI线下营销方案，无死角全面AI升级',
      features: [
      ],
      process: [],
      blocks: [
        { title: '数据监测', desc: '持续追踪关键指标' },
        { title: '模型优化', desc: '提升AI算法性能' },
        { title: '效果复盘', desc: '每月评估' }
      ]
    },
    'Comprehensive Customization Services': {
      title: 'Comprehensive Customization Services',
      content: 'Different products and different enterprises need more personalized customized solutions:\n' +
      '- Digital employee customization: Integrate with enterprise brand tonality to create exclusive brand digital human images and interactive styles\n' +
      '- Content and training outsourcing: Professional team one-on-one service, help generate, train and optimize content\n' +
      '- Display device customization: Provide large-size, semi-transparent, naked-eye 3D and other diversified hardware forms to match different offline marketing scenarios\n' +
      '- All-scenario AI marketing design: Design complete AI offline marketing solutions based on exhibitions, stores, showrooms and other scenarios, comprehensive AI upgrades without dead ends',
      features: [
      ],
      process: [],
      blocks: [
        { title: 'Data Monitoring', desc: 'Continuous tracking of key indicators' },
        { title: 'Model Optimization', desc: 'Improve AI algorithm performance' },
        { title: 'Effectiveness Review', desc: 'Monthly review' }
      ]
    },
    'Dịch vụ tùy chỉnh toàn diện': {
      title: 'Dịch vụ tùy chỉnh toàn diện',
      content: 'Trưng bày số hóa các sản phẩm khác nhau, các doanh nghiệp khác nhau, cần các giải pháp tùy chỉnh cá nhân hóa hơn:\n' +
      '- Tùy chỉnh nhân viên số: Tích hợp với tông màu thương hiệu doanh nghiệp, tạo hình ảnh và phong cách tương tác nhân vật số thương hiệu độc quyền\n' +
      '- Nội dung tuyên truyền và đào tạo đại diện vận hành: Đội ngũ chuyên nghiệp phục vụ một kèm một, đại diện tạo, đào tạo và tối ưu hóa nội dung\n' +
      '- Tùy chỉnh thiết bị hiển thị: Cung cấp các dạng phần cứng đa dạng như kích thước lớn, bán trong suốt, 3D không kính để phù hợp với các kịch bản tiếp thị ngoại tuyến khác nhau\n' +
      '- Thiết kế tiếp thị AI toàn kịch bản: Thiết kế hoàn chỉnh giải pháp tiếp thị ngoại tuyến AI dựa trên hội chợ, cửa hàng, phòng trưng bày và các kịch bản khác, nâng cấp AI toàn diện không có điểm chết',
      features: [
      ],
      process: [],
      blocks: [
        { title: 'Giám sát dữ liệu', desc: 'Theo dõi liên tục các chỉ số chính' },
        { title: 'Tối ưu hóa mô hình', desc: 'Cải thiện hiệu suất thuật toán AI' },
        { title: 'Tổng kết hiệu quả', desc: 'Đánh giá hàng tháng' }
      ]
    }
  };
  currentService.value = serviceDetails[service.title as keyof typeof serviceDetails];
  showServiceModal.value = true;
};

// 获取服务图片
const getServiceImage = (title: string) => {
  const imageMap = {
    'AI 导购一体机': 'https://public.readdy.ai/ai/img_res/895858ec25000ae54fb48a166707dad1.jpg',
    'AI Shopping Assistant All-in-One Kiosk': 'https://public.readdy.ai/ai/img_res/895858ec25000ae54fb48a166707dad1.jpg',
    'Gephura 数字员工平台': 'https://public.readdy.ai/ai/img_res/b44f60484f923bed581e09f8a46985f8.jpg',
    '全景定制服务': 'https://public.readdy.ai/ai/img_res/d90fd54d67383807ed44365a0e91f9d9.jpg',
    'AI Shopping Guide All-in-One Machine': 'https://public.readdy.ai/ai/img_res/895858ec25000ae54fb48a166707dad1.jpg',
    'Gephura Digital Employee Platform': 'https://public.readdy.ai/ai/img_res/b44f60484f923bed581e09f8a46985f8.jpg',
    'Comprehensive Customization Services': 'https://public.readdy.ai/ai/img_res/d90fd54d67383807ed44365a0e91f9d9.jpg',
    'Máy bán hàng thông minh AI tích hợp tất cả': 'https://public.readdy.ai/ai/img_res/895858ec25000ae54fb48a166707dad1.jpg',
    'Nền tảng nhân viên số Gephura': 'https://public.readdy.ai/ai/img_res/b44f60484f923bed581e09f8a46985f8.jpg',
    'Dịch vụ tùy chỉnh toàn diện': 'https://public.readdy.ai/ai/img_res/d90fd54d67383807ed44365a0e91f9d9.jpg'
  };
  return imageMap[title as keyof typeof imageMap];
};

// 获取案例图片
const getCaseImage = (title: string) => {
  const imageMap = {
    '全球展会': 'https://public.readdy.ai/ai/img_res/f90fbf5082584a96453aefaa7be729af.jpg',
    '品牌门店': 'https://public.readdy.ai/ai/img_res/4addef60744ac87fbd4b8d30a80e2da7.jpg',
    '服务大厅': 'https://public.readdy.ai/ai/img_res/28d36d62592de6a55f05f9da035482eb.jpg',
    'Global Exhibitions': 'https://public.readdy.ai/ai/img_res/f90fbf5082584a96453aefaa7be729af.jpg',
    'Brand Stores': 'https://public.readdy.ai/ai/img_res/4addef60744ac87fbd4b8d30a80e2da7.jpg',
    'Service Halls': 'https://public.readdy.ai/ai/img_res/28d36d62592de6a55f05f9da035482eb.jpg',
    'Hội chợ toàn cầu': 'https://public.readdy.ai/ai/img_res/f90fbf5082584a96453aefaa7be729af.jpg',
    'Cửa hàng thương hiệu': 'https://public.readdy.ai/ai/img_res/4addef60744ac87fbd4b8d30a80e2da7.jpg',
    'Sảnh dịch vụ': 'https://public.readdy.ai/ai/img_res/28d36d62592de6a55f05f9da035482eb.jpg'
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
</style>