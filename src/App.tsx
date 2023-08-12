
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './component/admin/Dashboard'
import List from './component/admin/List'
import Edit from './component/admin/Edit'
import Add from './component/admin/Add'
import Musics from './component/Musics'
import WebsiteLayout from './layout/WebsiteLayout'
import MusicDetail from './component/MusicDetail'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="list" >
              <Route index element={<List />} />
              <Route path=':id/edit' element={<Edit />} />
              <Route path='add' element={<Add />} />
            </Route>
          </Route>
          <Route path="/" element={<WebsiteLayout />} >
            <Route index element={<Musics />} />

            <Route path=":id" element={<MusicDetail />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
