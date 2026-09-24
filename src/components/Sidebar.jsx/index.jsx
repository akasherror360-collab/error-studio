import React from 'react'
import Div from '../Div'
import RecentPost from '../Widget/RecentPost'
import SearchWidget from '../Widget/SearchWidget'
import SideMenuWidget from '../Widget/SideMenuWidget'
import TagWidget from '../Widget/TagWidget'
import post1 from '../../assets/images/website/Instagram Posters/0-(4).webp'
import post2 from '../../assets/images/website/Instagram Posters/8-(2).webp'

export default function Sidebar() {
  const tagData = [
    {
      title: 'Wedding',
      url:'/blog'
    },
    {
      title: 'Cuddalore',
      url:'/blog'
    },
    {
      title: 'Photography',
      url:'/blog'
    },
    {
      title: 'Videography',
      url:'/blog'
    },
    {
      title: 'Album Design',
      url:'/blog'
    },
  ]

  const categoryData = [
    {
      title: 'Wedding Guide',
      url:'/blog'
    },
    {
      title: 'Shoot Tips',
      url:'/blog'
    },
  ]
  const recentPostData = [
    {
      title: "Wedding venues in and around Cuddalore: a couple's guide",
      thumb: post1,
      href: '/blog/wedding-venues-in-and-around-cuddalore',
      date: '22 Sep 2026'
    },
    {
      title: 'How to prepare for your wedding shoot: tips from our team',
      thumb: post2,
      href: '/blog/how-to-prepare-for-your-wedding-shoot',
      date: '22 Sep 2026'
    }
  ]
  return (
    <>
      <Div className="cs-sidebar_item">
        <SearchWidget title='Search'/>
      </Div>
      <Div className="cs-sidebar_item">
        <SideMenuWidget title='Categories' data={categoryData}/>
      </Div>
      <Div className="cs-sidebar_item">
        <RecentPost title='Recent Posts' data={recentPostData}/>
      </Div>
      <Div className="cs-sidebar_item">
        <TagWidget title='Tags' data={tagData}/>
      </Div>
    </>
  )
}
