import css from 'styled-jsx/css'

const NavigationBarContainerStyle = css`
div.NavigationBar::-webkit-scrollbar {
    width: 10px;
}
div.NavigationBar::-webkit-scrollbar-track {
    background: #5c646c; 
}
div.NavigationBar::-webkit-scrollbar-thumb {
    background: #4b555f; 
}
div.NavigationBar::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
.NavigationBar {
  font-family: Arial, Helvetica, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #5c646c;
  color: white;
  font-size: 14px;
  font-weight: bold;
  width: 150px;
  height: 100%;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
}
.NavigationBar ul {
  align-items: center;
  list-style-type: none;
  padding: 0;
}
`

const NavigationBarList = ({children}) => (
  <div className='NavigationBar' >
    <ul>{children}</ul>
    <style jsx>{NavigationBarContainerStyle}</style>
  </div>
)
export default NavigationBarList
