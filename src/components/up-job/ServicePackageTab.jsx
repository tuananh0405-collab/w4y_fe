import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Miễn phí',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '0đ',
    description: "The perfect plan if you're just getting started with our product.",
    features: ['Đăng tối đa 3 tin tuyển dụng', 'Xem hồ sơ ứng viên cơ bản', 'Hỗ trợ email'],
    featured: false,
  },
  {
    name: 'Premium',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '800.000đ',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Đăng không giới hạn bài tuyển dụng',
      'Ưu tiền hiển thị tin tuyển dụng',
      'Xen hồ sơ chi tiết ứng tuyển',
      'Tính năng lọc nâng cao',
      'Hỗ trợ 24/ 7 qua phone & email',
      'Quản lý ứng viên chuyên nghiệp',
      'Báo cáo thống kê chi tiết',
      'Tính năng lọc và tìm kiếm nâng cao'
    ],
    featured: true,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ServicePackageTab() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-10 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        {/* <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2> */}
        <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
          Gói dịch vụ W4UVIP
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
        Chọn gói dịch vụ phù hợp để tối ưu hoá hiệu quả
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative bg-[#3A6656] shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                  : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
            )}
          >
            <h3
              id={tier.id}
              className={classNames(tier.featured ? 'text-indigo-400' : 'text-[#6A9183]', 'text-base/7 font-semibold')}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                {tier.priceMonthly}
              </span>
              <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/tháng</span>
            </p>
            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm/6 sm:mt-10',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(tier.featured ? 'text-[#A8BBB4]' : 'text-[#3A6656]', 'h-6 w-5 flex-none')}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-[#6A9183] text-white shadow-xs hover:bg-[#A8BBB4] focus-visible:outline-indigo-500'
                  : 'text-[#3A6656] ring-1 ring-indigo-200 ring-inset hover:ring-[#3A6656] focus-visible:outline-indigo-600',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
              )}
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
