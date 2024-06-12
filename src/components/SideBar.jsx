import React from 'react'
import SideBarMenu from './SideBarMenu'

const SideBar = () => {
  return (
    <div>
    <div className='fixed flex flex-col h-full w-96 bg-light top-14'>
        <SideBarMenu label={'Home'} routePath={'/'}></SideBarMenu>
        <SideBarMenu label={'Today\'s Collection'}  routePath={'/todayscollection'}></SideBarMenu>
        <SideBarMenu label={'Generate Dues'}  routePath={'/generatedues'}></SideBarMenu>
        <SideBarMenu label={'Generate Collection'}  routePath={'/generatecollection'}></SideBarMenu>
        <SideBarMenu label={'Student Details'}  routePath={'/studentdetails'}></SideBarMenu>
        <SideBarMenu label={'Add Student'}  routePath={'/addstudent'}></SideBarMenu>
        <SideBarMenu label={'Generate Student List'}  routePath={'/generatestudentlist'}></SideBarMenu>
        <div className='absolute flex items-center justify-center w-full h-20 border-red-600 border-y-2 bottom-14 hover:cursor-pointer text-light hover:bg-red-300'>
        <img src='src/assets/log-out.png' alt='logout-img' className='mr-4 w-14 h-14'></img>
        <h1 className='text-3xl font-semibold text-red-600'>Logout</h1>
    </div>
    </div>
   

    
    
    </div>
  )
}

export default SideBar