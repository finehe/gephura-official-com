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
            <p class="text-gray-600 text-lg leading-relaxed text-left">
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

// 导入logo图片
import logoImage from '../assets/web-logo.svg';

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
      content: '在 Gephura，我们致力于通过 AI 技术推动企业数字化转型和提升运营效率。我们的核心价值观——创新、效率和可持续发展，指引我们在 AI 时代赋能企业。'
    },
    services: {
      title: '核心服务',
      items: [
        {
          title: 'AI 应用咨询',
          description: '为企业提供 AI 战略规划和落地方案，助力企业数字化转型'
        },
        {
          title: '定制化 AI 应用开发',
          description: '根据企业需求开发专属 AI 解决方案，提升业务效率'
        },
        {
          title: 'AI 技术与业务运营支持',
          description: '提供全方位的 AI 技术支持和运营优化服务'
        }
      ],
      more: '了解更多'
    },
    cases: {
      title: '行业案例',
      items: [
        {
          title: '电商 AI 解决方案',
          description: '电商革新，通过 AI 驱动的个性化推荐和库存管理，变革在线零售体验。'
        },
        {
          title: '医疗 AI 系统',
          description: '医疗创新，利用 AI 驱动的系统提升患者护理质量和医院运营效率。'
        },
        {
          title: '制造业 AI 解决方案',
          description: '制造卓越，通过 AI 和机器学习优化生产流程和质量控制。'
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
      about: 'About',
      services: 'Services',
      cases: 'Cases',
      contact: 'Contact'
    },
    hero: {
      title: 'Drive Innovation and Growth through AI',
      subtitle: 'Providing cutting-edge solutions and expert guidance to help enterprises thrive in the AI era.',
      cta: 'Get Started'
    },
    about: {
      title: 'About Us',
      content: 'At Gephura, we are dedicated to driving digital transformation and operational efficiency through AI technology. Our core values - innovation, efficiency, and sustainability - guide us in empowering enterprises in the AI era.'
    },
    services: {
      title: 'Core Services',
      items: [
        {
          title: 'AI Consulting',
          description: 'Provide AI strategy planning and implementation solutions to assist enterprise digital transformation'
        },
        {
          title: 'Custom AI Development',
          description: 'Develop exclusive AI solutions based on enterprise needs to improve business efficiency'
        },
        {
          title: 'AI Tech & Operations Support',
          description: 'Provide comprehensive AI technical support and operational optimization services'
        }
      ],
      more: 'Learn More'
    },
    cases: {
      title: 'Industry Cases',
      items: [
        {
          title: 'E-commerce AI Solution',
          description: 'Revolutionizing online retail through AI-driven personalized recommendations and inventory management.'
        },
        {
          title: 'Healthcare AI System',
          description: 'Innovating healthcare with AI-powered systems to enhance patient care and hospital operations.'
        },
        {
          title: 'Manufacturing AI Solution',
          description: 'Achieving manufacturing excellence through AI and machine learning for process and quality optimization.'
        }
      ]
    },
    contact: {
      title: 'Let\'s Shape the Future Together',
      description: 'Ready to leverage the power of AI for your business? Our expert team is here to guide you through your AI journey. Contact us now to explore how we can help you achieve unprecedented growth and efficiency.'
    }
  },
  vi: {
    nav: {
      about: 'Về chúng tôi',
      services: 'Dịch vụ',
      cases: 'Dự án',
      contact: 'Liên hệ'
    },
    hero: {
      title: 'Thúc đẩy đổi mới và tăng trưởng thông qua AI',
      subtitle: 'Cung cấp giải pháp tiên tiến và hướng dẫn chuyên môn để giúp doanh nghiệp phát triển trong kỷ nguyên AI.',
      cta: 'Bắt đầu ngay'
    },
    about: {
      title: 'Về chúng tôi',
      content: 'Tại Gephura, chúng tôi cam kết thúc đẩy chuyển đổi số và hiệu quả hoạt động thông qua công nghệ AI. Các giá trị cốt lõi của chúng tôi - đổi mới, hiệu quả và phát triển bền vững - hướng dẫn chúng tôi trong việc trao quyền cho doanh nghiệp trong kỷ nguyên AI.'
    },
    services: {
      title: 'Dịch vụ cốt lõi',
      items: [
        {
          title: 'Tư vấn AI',
          description: 'Cung cấp kế hoạch chiến lược AI và giải pháp triển khai để hỗ trợ chuyển đổi số doanh nghiệp'
        },
        {
          title: 'Phát triển AI tùy chỉnh',
          description: 'Phát triển giải pháp AI độc quyền dựa trên nhu cầu doanh nghiệp để cải thiện hiệu quả kinh doanh'
        },
        {
          title: 'Hỗ trợ kỹ thuật & vận hành AI',
          description: 'Cung cấp dịch vụ hỗ trợ kỹ thuật AI toàn diện và tối ưu hóa vận hành'
        }
      ],
      more: 'Tìm hiểu thêm'
    },
    cases: {
      title: 'Dự án ngành',
      items: [
        {
          title: 'Giải pháp AI thương mại điện tử',
          description: 'Cách mạng hóa bán lẻ trực tuyến thông qua đề xuất cá nhân hóa và quản lý kho được điều khiển bởi AI.'
        },
        {
          title: 'Hệ thống AI y tế',
          description: 'Đổi mới chăm sóc sức khỏe với hệ thống được hỗ trợ bởi AI để nâng cao chất lượng chăm sóc bệnh nhân và hoạt động bệnh viện.'
        },
        {
          title: 'Giải pháp AI sản xuất',
          description: 'Đạt được sự xuất sắc trong sản xuất thông qua AI và máy học để tối ưu hóa quy trình và chất lượng.'
        }
      ]
    },
    contact: {
      title: 'Hãy cùng nhau kiến tạo tương lai',
      description: 'Sẵn sàng tận dụng sức mạnh của AI cho doanh nghiệp của bạn? Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hướng dẫn bạn trong hành trình AI. Liên hệ với chúng tôi ngay để khám phá cách chúng tôi có thể giúp bạn đạt được tăng trưởng và hiệu quả chưa từng có.'
    }
  }
};
const logoUrl = logoImage;
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
    'AI 应用咨询': {
      title: 'AI 应用咨询',
      content: '解决企业在AI应用上的痛点，提供全面的场景诊断与规划服务。评估业务流程的数字化成熟度，筛选具有高价值的AI应用场景，从而实现成本节约、效率提升和风险控制。我们提供12周快速验证方案设计，帮助企业避免盲目投入，锁定可量化的改进目标。',
      features: [
        '业务流程数字化成熟度评估',
        '高价值AI应用场景筛选（成本节约/效率提升/风险控制）',
        '12周快速验证方案设计'
      ],
      process: [
        { title: '业务流程评估', desc: '评估企业数字化基础' },
        { title: '场景筛选', desc: '确定AI应用潜力领域' },
        { title: '快速验证', desc: '12周内验证方案可行性' }
      ],
      blocks: []
    },
    'AI Consulting': {
      title: 'AI Consulting',
      content: 'Addressing enterprise pain points in AI applications by providing comprehensive scenario diagnosis and planning services. We evaluate the digital maturity of business processes and identify high-value AI application scenarios to achieve cost savings, efficiency improvements, and risk control. We offer a 12-week rapid validation program design to help enterprises avoid blind investments and lock in quantifiable improvement goals.',
      features: [
        'Business Process Digital Maturity Assessment',
        'High-Value AI Application Scenario Screening (Cost Savings/Efficiency Improvement/Risk Control)',
        '12-Week Rapid Validation Program Design'
      ],
      process: [
        { title: 'Business Process Assessment', desc: 'Evaluate enterprise digital foundation' },
        { title: 'Scenario Screening', desc: 'Identify AI application potential areas' },
        { title: 'Rapid Validation', desc: 'Validate program feasibility within 12 weeks' }
      ],
      blocks: []
    },
    'Tư vấn AI': {
      title: 'Tư vấn AI',
      content: 'Giải quyết các điểm đau của doanh nghiệp trong ứng dụng AI bằng cách cung cấp dịch vụ chẩn đoán và lập kế hoạch kịch bản toàn diện. Chúng tôi đánh giá mức độ trưởng thành số của quy trình kinh doanh và xác định các kịch bản ứng dụng AI có giá trị cao để đạt được tiết kiệm chi phí, cải thiện hiệu quả và kiểm soát rủi ro. Chúng tôi cung cấp thiết kế chương trình xác thực nhanh 12 tuần để giúp doanh nghiệp tránh đầu tư mù quáng và khóa các mục tiêu cải tiến có thể định lượng.',
      features: [
        'Đánh giá mức độ trưởng thành số của quy trình kinh doanh',
        'Sàng lọc kịch bản ứng dụng AI có giá trị cao (Tiết kiệm chi phí/Cải thiện hiệu quả/Kiểm soát rủi ro)',
        'Thiết kế chương trình xác thực nhanh 12 tuần'
      ],
      process: [
        { title: 'Đánh giá quy trình kinh doanh', desc: 'Đánh giá nền tảng số của doanh nghiệp' },
        { title: 'Sàng lọc kịch bản', desc: 'Xác định các lĩnh vực tiềm năng ứng dụng AI' },
        { title: 'Xác thực nhanh', desc: 'Xác thực tính khả thi của chương trình trong vòng 12 tuần' }
      ],
      blocks: []
    },
    '定制化 AI 应用开发': {
      title: '定制化 AI 应用开发',
      content: '针对传统软件改造成本高、现有SaaS不符合业务需求的问题，提供轻量级AI工具开发服务。我们的特点是模块化开发，基于开源框架快速搭建。我们采用渐进式迭代，从单功能MVP到系统集成。典型应用场景包括直播电商智能话术系统和企业微信定制化商城等。',
      features: [
        '模块化开发：基于开源框架快速搭建',
        '渐进式迭代：从单功能MVP到系统集成',
        '典型场景：✔ 直播电商智能话术系统 ✔ 企业微信定制化商城'
      ],
      process: [],
      blocks: [
        { title: '模块化', desc: '快速搭建，灵活组合' },
        { title: '渐进式', desc: 'MVP验证，逐步集成' },
        { title: '定制化', desc: '满足特定业务需求' }
      ]
    },
    'Custom AI Development': {
      title: 'Custom AI Development',
      content: 'Addressing the high cost of traditional software transformation and the mismatch between existing SaaS and business needs by providing lightweight AI tool development services. Our approach features modular development based on open-source frameworks for rapid deployment. We employ progressive iteration, from single-function MVP to system integration. Typical application scenarios include live e-commerce intelligent dialogue systems and WeChat Work customized malls.',
      features: [
        'Modular Development: Rapid deployment based on open-source frameworks',
        'Progressive Iteration: From single-function MVP to system integration',
        'Typical Scenarios: ✔ Live E-commerce Intelligent Dialogue System ✔ WeChat Work Customized Mall'
      ],
      process: [],
      blocks: [
        { title: 'Modular', desc: 'Rapid deployment, flexible combination' },
        { title: 'Progressive', desc: 'MVP validation, gradual integration' },
        { title: 'Customized', desc: 'Meet specific business needs' }
      ]
    },
    'Phát triển AI tùy chỉnh': {
      title: 'Phát triển AI tùy chỉnh',
      content: 'Giải quyết chi phí chuyển đổi phần mềm truyền thống cao và sự không phù hợp giữa SaaS hiện có và nhu cầu kinh doanh bằng cách cung cấp dịch vụ phát triển công cụ AI nhẹ. Phương pháp của chúng tôi có tính năng phát triển mô-đun dựa trên các framework mã nguồn mở để triển khai nhanh chóng. Chúng tôi sử dụng lặp lại tiến bộ, từ MVP chức năng đơn lẻ đến tích hợp hệ thống. Các kịch bản ứng dụng điển hình bao gồm hệ thống đối thoại thông minh thương mại điện tử trực tiếp và cửa hàng tùy chỉnh WeChat Work.',
      features: [
        'Phát triển mô-đun: Triển khai nhanh dựa trên các framework mã nguồn mở',
        'Lặp lại tiến bộ: Từ MVP chức năng đơn lẻ đến tích hợp hệ thống',
        'Kịch bản điển hình: ✔ Hệ thống đối thoại thông minh thương mại điện tử trực tiếp ✔ Cửa hàng tùy chỉnh WeChat Work'
      ],
      process: [],
      blocks: [
        { title: 'Mô-đun', desc: 'Triển khai nhanh, kết hợp linh hoạt' },
        { title: 'Tiến bộ', desc: 'Xác thực MVP, tích hợp dần dần' },
        { title: 'Tùy chỉnh', desc: 'Đáp ứng nhu cầu kinh doanh cụ thể' }
      ]
    },
    'AI 技术与业务运营支持': {
      title: 'AI 技术与业务运营支持',
      content: '我们解决技术供应商交付后缺乏持续支持、效果难以维持的问题，提供技术运营陪跑服务。我们采用季度制服务包，包括数据监测、模型优化和异常响应。我们与业务指标对齐，每月进行效果复盘会议，并进行知识转移，帮助企业建设自有团队能力。',
      features: [
        '季度制服务包：数据监测+模型优化+异常响应',
        '业务指标对齐：每月效果复盘会议',
        '知识转移：企业自有团队能力建设'
      ],
      process: [],
      blocks: [
        { title: '数据监测', desc: '持续追踪关键指标' },
        { title: '模型优化', desc: '提升AI算法性能' },
        { title: '效果复盘', desc: '每月评估' }
      ]
    },
    'AI Tech & Operations Support': {
      title: 'AI Tech & Operations Support',
      content: 'We address the lack of continuous support and difficulty in maintaining effectiveness after technical vendor delivery by providing technical operations support services. We offer quarterly service packages including data monitoring, model optimization, and anomaly response. We align with business metrics, conduct monthly effectiveness review meetings, and facilitate knowledge transfer to help enterprises build their own team capabilities.',
      features: [
        'Quarterly Service Package: Data Monitoring + Model Optimization + Anomaly Response',
        'Business Metrics Alignment: Monthly Effectiveness Review Meetings',
        'Knowledge Transfer: Enterprise Team Capability Building'
      ],
      process: [],
      blocks: [
        { title: 'Data Monitoring', desc: 'Continuous tracking of key metrics' },
        { title: 'Model Optimization', desc: 'Enhance AI algorithm performance' },
        { title: 'Effectiveness Review', desc: 'Monthly assessment' }
      ]
    },
    'Hỗ trợ kỹ thuật & vận hành AI': {
      title: 'Hỗ trợ kỹ thuật & vận hành AI',
      content: 'Chúng tôi giải quyết vấn đề thiếu hỗ trợ liên tục và khó khăn trong việc duy trì hiệu quả sau khi nhà cung cấp kỹ thuật giao hàng bằng cách cung cấp dịch vụ hỗ trợ vận hành kỹ thuật. Chúng tôi cung cấp các gói dịch vụ hàng quý bao gồm giám sát dữ liệu, tối ưu hóa mô hình và phản hồi bất thường. Chúng tôi liên kết với các chỉ số kinh doanh, tiến hành các cuộc họp đánh giá hiệu quả hàng tháng và tạo điều kiện chuyển giao kiến thức để giúp doanh nghiệp xây dựng khả năng đội ngũ của riêng họ.',
      features: [
        'Gói dịch vụ hàng quý: Giám sát dữ liệu + Tối ưu hóa mô hình + Phản hồi bất thường',
        'Liên kết chỉ số kinh doanh: Cuộc họp đánh giá hiệu quả hàng tháng',
        'Chuyển giao kiến thức: Xây dựng khả năng đội ngũ doanh nghiệp'
      ],
      process: [],
      blocks: [
        { title: 'Giám sát dữ liệu', desc: 'Theo dõi liên tục các chỉ số chính' },
        { title: 'Tối ưu hóa mô hình', desc: 'Nâng cao hiệu suất thuật toán AI' },
        { title: 'Đánh giá hiệu quả', desc: 'Đánh giá hàng tháng' }
      ]
    }
  };
  currentService.value = serviceDetails[service.title as keyof typeof serviceDetails];
  showServiceModal.value = true;
};

// 获取服务图片
const getServiceImage = (title: string) => {
  const imageMap = {
    'AI 应用咨询': 'https://public.readdy.ai/ai/img_res/895858ec25000ae54fb48a166707dad1.jpg',
    '定制化 AI 应用开发': 'https://public.readdy.ai/ai/img_res/b44f60484f923bed581e09f8a46985f8.jpg',
    'AI 技术与业务运营支持': 'https://public.readdy.ai/ai/img_res/d90fd54d67383807ed44365a0e91f9d9.jpg',
    'AI Consulting': 'https://public.readdy.ai/ai/img_res/895858ec25000ae54fb48a166707dad1.jpg',
    'Custom AI Development': 'https://public.readdy.ai/ai/img_res/b44f60484f923bed581e09f8a46985f8.jpg',
    'AI Tech & Operations Support': 'https://public.readdy.ai/ai/img_res/d90fd54d67383807ed44365a0e91f9d9.jpg',
    'Tư vấn AI': 'https://public.readdy.ai/ai/img_res/895858ec25000ae54fb48a166707dad1.jpg',
    'Phát triển AI tùy chỉnh': 'https://public.readdy.ai/ai/img_res/b44f60484f923bed581e09f8a46985f8.jpg',
    'Hỗ trợ kỹ thuật & vận hành AI': 'https://public.readdy.ai/ai/img_res/d90fd54d67383807ed44365a0e91f9d9.jpg'
  };
  return imageMap[title as keyof typeof imageMap];
};

// 获取案例图片
const getCaseImage = (title: string) => {
  const imageMap = {
    '电商 AI 解决方案': 'https://public.readdy.ai/ai/img_res/f90fbf5082584a96453aefaa7be729af.jpg',
    '医疗 AI 系统': 'https://public.readdy.ai/ai/img_res/4addef60744ac87fbd4b8d30a80e2da7.jpg',
    '制造业 AI 解决方案': 'https://public.readdy.ai/ai/img_res/28d36d62592de6a55f05f9da035482eb.jpg',
    'E-commerce AI Solution': 'https://public.readdy.ai/ai/img_res/f90fbf5082584a96453aefaa7be729af.jpg',
    'Healthcare AI System': 'https://public.readdy.ai/ai/img_res/4addef60744ac87fbd4b8d30a80e2da7.jpg',
    'Manufacturing AI Solution': 'https://public.readdy.ai/ai/img_res/28d36d62592de6a55f05f9da035482eb.jpg',
    'Giải pháp AI thương mại điện tử': 'https://public.readdy.ai/ai/img_res/f90fbf5082584a96453aefaa7be729af.jpg',
    'Hệ thống AI y tế': 'https://public.readdy.ai/ai/img_res/4addef60744ac87fbd4b8d30a80e2da7.jpg',
    'Giải pháp AI sản xuất': 'https://public.readdy.ai/ai/img_res/28d36d62592de6a55f05f9da035482eb.jpg'
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