"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

const CompanyDetails = () => {

    const currPage = usePathname();

    console.log("router", currPage)

    return (
        <div>CompanyDetails</div>
    )
}

export default CompanyDetails