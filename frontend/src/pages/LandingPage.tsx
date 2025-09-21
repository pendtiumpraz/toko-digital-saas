import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon, ChartBarIcon, ChatBubbleLeftRightIcon, SparklesIcon, GlobeAltIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Katalog Digital',
    description: 'Upload gambar produk dengan batas sesuai paket. Embed video YouTube dan gambar dari Google Drive.',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Integrasi WhatsApp',
    description: 'Arahkan customer langsung ke WhatsApp untuk pemesanan mudah dan cepat.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Manajemen Keuangan',
    description: 'Lacak penjualan, hitung profit otomatis, export ke Excel, dan lihat grafik analitik.',
    icon: ChartBarIcon,
  },
  {
    name: 'AI Landing Page',
    description: 'Generator AI untuk membuat halaman produk yang menarik secara otomatis (Paket Enterprise).',
    icon: SparklesIcon,
  },
  {
    name: 'Custom Domain',
    description: 'Gunakan subdomain gratis atau domain custom sesuai paket yang dipilih.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Manajemen Stok',
    description: 'Pantau stok produk real-time, otomatis berkurang saat terjual.',
    icon: CreditCardIcon,
  },
];

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    href: '#',
    priceMonthly: 'Rp 99.000',
    priceYearly: 'Rp 990.000',
    description: 'Cocok untuk toko kecil yang baru memulai.',
    features: [
      '100 Produk',
      '1 GB Storage',
      'Subdomain Gratis',
      'WhatsApp Integration',
      'Chat Support',
      'Export Excel',
      'Analytics Dasar',
      '3 Team Members',
      'Email Marketing',
      'Remove Watermark',
    ],
    notIncluded: [
      'Custom Domain',
      'AI Landing Page',
      'API Access',
      'Priority Support',
      'Abandoned Cart Recovery',
    ],
    mostPopular: false,
  },
  {
    name: 'Professional',
    id: 'tier-professional',
    href: '#',
    priceMonthly: 'Rp 299.000',
    priceYearly: 'Rp 2.990.000',
    description: 'Untuk toko yang sedang berkembang pesat.',
    features: [
      '1000 Produk',
      '5 GB Storage',
      'Custom Domain',
      'WhatsApp Integration',
      'Priority Support',
      'Export Excel',
      'Analytics Advanced',
      '10 Team Members',
      'Email Marketing',
      'Remove Watermark',
      '3 Toko',
      'API Access',
      'Abandoned Cart Recovery',
    ],
    notIncluded: [
      'AI Landing Page',
      'Unlimited Products',
      'Unlimited Stores',
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: 'Rp 999.000',
    priceYearly: 'Rp 9.990.000',
    description: 'Solusi lengkap untuk bisnis besar.',
    features: [
      'Unlimited Produk',
      '50 GB Storage',
      'Custom Domain',
      'WhatsApp Integration',
      'Priority Support 24/7',
      'Export Excel',
      'Analytics Advanced',
      'Unlimited Team Members',
      'Email Marketing',
      'Remove Watermark',
      'Unlimited Toko',
      'API Access',
      'Abandoned Cart Recovery',
      'AI Landing Page Generator',
      'Custom Integration',
      'Dedicated Account Manager',
    ],
    notIncluded: [],
    mostPopular: false,
  },
];

export default function LandingPage() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-primary-600">Toko Digital</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">Features</a>
            <a href="#pricing" className="text-sm font-semibold leading-6 text-gray-900">Pricing</a>
            <a href="#about" className="text-sm font-semibold leading-6 text-gray-900">About</a>
            <a href="#contact" className="text-sm font-semibold leading-6 text-gray-900">Contact</a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
            <a href="/register" className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
              Free Trial 14 Hari
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Platform Toko Online SaaS Terlengkap
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Buat toko online profesional dalam hitungan menit. Kelola katalog, stok, keuangan, dan customer dengan mudah.
              Dilengkapi AI untuk generate landing page otomatis!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="/register" className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
                Mulai Free Trial 14 Hari
              </a>
              <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                Lihat Fitur <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>

      <div id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Fitur Lengkap</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Semua yang Anda butuhkan untuk toko online sukses
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Platform all-in-one untuk mengelola toko online Anda. Dari katalog produk hingga analisa keuangan.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div id="pricing" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Pilih paket yang tepat untuk bisnis Anda
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Mulai dengan Free Trial 14 hari. Tidak perlu kartu kredit. Upgrade kapan saja.
          </p>

          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier, tierIdx) => (
              <div
                key={tier.id}
                className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                  tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : tierIdx === 0 ? 'lg:rounded-r-none' : 'lg:rounded-l-none'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 id={tier.id} className="text-lg font-semibold leading-8 text-gray-900">
                      {tier.name}
                    </h3>
                    {tier.mostPopular ? (
                      <p className="rounded-full bg-primary-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary-600">
                        Most popular
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
                    <span className="text-sm font-semibold leading-6 text-gray-600">/bulan</span>
                  </p>
                  <p className="text-sm text-gray-500">atau {tier.priceYearly}/tahun</p>

                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                    {tier.notIncluded.map((feature) => (
                      <li key={feature} className="flex gap-x-3 text-gray-400">
                        <XMarkIcon className="h-6 w-5 flex-none" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    tier.mostPopular
                      ? 'bg-primary-600 text-white shadow-sm hover:bg-primary-500 focus-visible:outline-primary-600'
                      : 'text-primary-600 ring-1 ring-inset ring-primary-200 hover:ring-primary-300'
                  }`}
                >
                  Mulai Free Trial
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-base font-semibold text-gray-900">Free Plan</p>
            <p className="mt-2 text-sm text-gray-600">
              10 Produk • 100 MB Storage • Subdomain Gratis • WhatsApp Integration • Export Excel
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2024 Toko Digital. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}