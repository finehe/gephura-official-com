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
        <button @click="toggleMenu" class="md:hidden text-gray-600 hover:text-blue-600 transition-colors">
          <i class="fas" :class="isMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
        <!-- 桌面端导航 -->
        <div class="hidden md:flex items-center space-x-8">
          <a v-for="item in navItems" :key="item.id" :class="['hover:text-blue-600 transition-colors cursor-pointer',
            currentNav === item.id ? 'text-blue-600' : 'text-gray-700']" @click="scrollToSection(item.id)">
            {{ i18n[currentLang].nav[item.id] }}
          </a>
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
            <h2 class="text-3xl font-bold mb-6">关于我们</h2>
            <p class="text-gray-600 text-lg leading-relaxed text-left">
              在 Gephura，我们致力于通过 AI 技术推动企业数字化转型和提升运营效率。我们的核心价值观——创新、效率和可持续发展，指引我们在 AI 时代赋能企业。
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
        <h2 class="text-3xl font-bold text-center mb-16">核心服务</h2>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          <div v-for="service in services" :key="service.id"
            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
            <img :src="service.image" :alt="service.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-4">{{ service.title }}</h3>
              <p class="text-gray-600 mb-6 min-h-[4.5rem] line-clamp-3">{{ service.description }}</p>
              <button @click="showServiceDetails(service)"
                class="!rounded-button text-blue-600 hover:bg-blue-50 px-6 py-2 border border-blue-600 transition-all whitespace-nowrap">
                了解更多
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
        <h2 class="text-3xl font-bold text-center mb-16">行业案例</h2>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          <div v-for="case_ in cases" :key="case_.id"
            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
            <img :src="case_.image" :alt="case_.title" class="w-full h-48 object-cover">
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
        <h2 class="text-3xl font-bold text-center mb-16">让我们共同塑造未来</h2>
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <p class="text-lg text-gray-600 leading-relaxed">
              准备好利用 AI 的力量推动您的业务了吗？我们的专家团队随时为您提供 AI 之旅的全程指导。立即联系我们，探索如何帮助您实现前所未有的增长和效率。
            </p>
          </div>
          <div class="grid md:grid-cols-3 grid-cols-1 gap-8">
            <div class="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <i class="fas fa-phone text-blue-600 text-2xl mb-4"></i>
              <span class="text-gray-700 font-medium">联系电话</span>
              <a href="tel:021-12345678" class="text-blue-600 hover:text-blue-800 mt-2">198-2190-2019</a>
            </div>
            <div class="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <i class="fas fa-envelope text-blue-600 text-2xl mb-4"></i>
              <span class="text-gray-700 font-medium">电子邮箱</span>
              <a href="mailto:info@gephura.cn" class="text-blue-600 hover:text-blue-800 mt-2">info@gephura.cn</a>
            </div>
            <div class="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <i class="fas fa-map-marker-alt text-blue-600 text-2xl mb-4"></i>
              <span class="text-gray-700 font-medium">公司地址</span>
              <span class="text-gray-600 text-center mt-2">上海市浦东新区张江高科科苑路151号华强大厦三楼</span>
            </div>
          </div>
          <div class="mt-12 flex flex-col items-center">
            <h3 class="text-xl font-semibold mb-6">扫码添加企业微信</h3>
            <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <img src="/src/assets/wechat-qr.png" alt="企业微信二维码" class="w-40 h-40 object-contain">
              <p class="text-gray-500 text-sm mt-4 text-center">扫一扫，立即咨询</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <footer class="bg-gray-50 py-8 w-full">
      <div class="w-full px-6 text-center text-gray-500 text-sm">
        <p>© 2025 Gephura. All rights reserved.</p>
        <p class="mt-2">沪ICP备2025115766号-2</p>
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
import { ref } from 'vue';

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
const currentLang = ref('cn' as const);
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

const services = [
  {
    id: 1,
    title: 'AI 应用咨询',
    description: '为企业提供 AI 战略规划和落地方案，助力企业数字化转型',
    image: 'https://public.readdy.ai/ai/img_res/895858ec25000ae54fb48a166707dad1.jpg'
  },
  {
    id: 2,
    title: '定制化 AI 应用开发',
    description: '根据企业需求开发专属 AI 解决方案，提升业务效率',
    image: 'https://public.readdy.ai/ai/img_res/b44f60484f923bed581e09f8a46985f8.jpg'
  },
  {
    id: 3,
    title: 'AI 技术与业务运营支持',
    description: '提供全方位的 AI 技术支持和运营优化服务',
    image: 'https://public.readdy.ai/ai/img_res/d90fd54d67383807ed44365a0e91f9d9.jpg'
  }
];
const cases = [
  {
    id: 1,
    title: '电商 AI 解决方案',
    description: '电商革新，通过 AI 驱动的个性化推荐和库存管理，变革在线零售体验。',
    image: 'https://public.readdy.ai/ai/img_res/f90fbf5082584a96453aefaa7be729af.jpg'
  },
  {
    id: 2,
    title: '医疗 AI 系统',
    description: '医疗创新，利用 AI 驱动的系统提升患者护理质量和医院运营效率。',
    image: 'https://public.readdy.ai/ai/img_res/4addef60744ac87fbd4b8d30a80e2da7.jpg'
  },
  {
    id: 3,
    title: '制造业 AI 解决方案',
    description: '制造卓越，通过 AI 和机器学习优化生产流程和质量控制。',
    image: 'https://public.readdy.ai/ai/img_res/28d36d62592de6a55f05f9da035482eb.jpg'
  }
];
const isMenuOpen = ref(false);

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
    }
  };
  currentService.value = serviceDetails[service.title as keyof typeof serviceDetails];
  showServiceModal.value = true;
};
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