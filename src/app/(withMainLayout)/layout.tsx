import React from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import { MainLayoutTypes } from '@/types/common'

function mainLayout({ children }: MainLayoutTypes) {
  return (
    <>
      <MainLayout>
        {children}
      </MainLayout>
    </>
  )
}

export default mainLayout