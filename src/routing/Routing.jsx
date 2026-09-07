import { Routes, Route } from 'react-router-dom'
import { paths } from './paths'

import {
  Home,
  About,
  Catalog,
  Premium,
  Login,
  Register,
  Profile,
  Cards,
  Library,
  Reading,
  ReadingSession,
  AdminUsers,
  AdminCards,
  AdminPlans,
  AdminBooks,
  NotFound,
} from '../pages/index'

const Routing = () => {
  return (
    <Routes>
      <Route path={paths.home} element={<Home />} />
      <Route path={paths.about} element={<About />} />
      <Route path={paths.catalog} element={<Catalog />} />
      <Route path={paths.premium} element={<Premium />} />
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.register} element={<Register />} />
      <Route path={paths.profile} element={<Profile />} />
      <Route path={paths.cards} element={<Cards />} />
      <Route path={paths.library} element={<Library />} />
      <Route path={paths.reading} element={<Reading />} />
      <Route path={paths.readingSession} element={<ReadingSession />} />
      <Route path={paths.adminUsers} element={<AdminUsers />} />
      <Route path={paths.adminCards} element={<AdminCards />} />
      <Route path={paths.adminPlans} element={<AdminPlans />} />
      <Route path={paths.adminBooks} element={<AdminBooks />} />
      <Route path={paths.notFound} element={<NotFound />} />
    </Routes>
  )
}

export default Routing
