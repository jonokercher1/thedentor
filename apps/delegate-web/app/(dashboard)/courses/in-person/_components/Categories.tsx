'use client'

import { type FC } from 'react'
import { Chip, Icon, IconName } from '@dentor/ui'
import { useRouter } from 'next/navigation'
import { CourseCategory } from '@/types/api/course/category/course-category'

interface CategoriesProps {
  categories: CourseCategory[]
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
  const router = useRouter()

  const onNavigateToCategory = (slug: string) => {
    router.push(`/courses/in-person/search?categories=${slug}`)
  }

  return (
    <section className="py-20">
      <h2 className="text-white text-3xl mb-6">Browse Categories</h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => (
          <Chip
            key={`course-category-${category.slug}`}
            label={category.label}
            trailingIcon={<Icon name={IconName.ChevronRight} className="text-white" />}
            onClick={() => onNavigateToCategory(category.slug)}
            className="bg-neutral-500"
          />
        ))}
      </div>
    </section>
  )
}

export default Categories