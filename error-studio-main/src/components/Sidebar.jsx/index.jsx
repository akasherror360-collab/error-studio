import React from 'react'
import Div from '../Div'
import RecentPost from '../Widget/RecentPost'
import SearchWidget from '../Widget/SearchWidget'
import SideMenuWidget from '../Widget/SideMenuWidget'
import TagWidget from '../Widget/TagWidget'
import post1 from '../../assets/images/website/Instagram Posters/0-(4).webp'
import post2 from '../../assets/images/website/Instagram Posters/8-(2).webp'
import post3 from '../../assets/images/website/Instagram Posters/11-(4).webp'

export default function Sidebar() {
  const tagData = [
    {
      title: 'Business',
      url:'/'
    },
    {
      title: 'Agency',
      url:'/'
    },
    {
      title: 'Artwork',
      url:'/'
    },
    {
      title: 'Marketing',
      url:'/'
    },
    {
      title: 'Information',
      url:'/'
    },
    {
      title: 'Design',
      url:'/'
    },
    {
      title: 'Wordpress',
      url:'/'
    },
  ]

  const categoryData = [
    {
      title: 'Corporate',
      url:'/'
    },
    {
      title: 'Company',
      url:'/'
    },
    {
      title: 'Search Engine',
      url:'/'
    },
    {
      title: 'Information',
      url:'/'
    },
    {
      title: 'Painting',
      url:'/'
    }
  ]
  const recentPostData = [
    {
      title: 'How to keep fear from ruining your art business with confident',
      thumb: post1,
      href: '/blog/how-to-keep-fear-from-ruining-your-art-business-with-confident',
      date: '07 Mar 2022'
    },
    {
      title: 'Artistic mind will be great for creation anything',
      thumb: post2,
      href: '/blog/artistic-mind-will-be-great-for-creation-anything',
      date: '10 Feb 2022'
    },
    {
      title: 'A.I will take over all job for human within next year',
      thumb: post3,
      href: '/blog/ai-will-take-over-all-job-for-human-within-next-year',
      date: '05 Mar 2022'
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
