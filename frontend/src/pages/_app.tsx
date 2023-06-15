import { useRef, useState, useEffect, Suspense } from 'react'
import { RecoilRoot } from 'recoil'

import dynamic from 'next/dynamic'
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useProgress, Html } from '@react-three/drei'
import { useRecoilState } from 'recoil'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()

  return (
    <RecoilRoot>
      <Header title={pageProps.title} />

      <Layout ref={ref}>
        <Component {...pageProps} />
        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
         * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
        {Component?.canvas && (
          <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
            {Component.canvas(pageProps)}
          </Scene>
        )}
      </Layout>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </RecoilRoot>
  )
}
