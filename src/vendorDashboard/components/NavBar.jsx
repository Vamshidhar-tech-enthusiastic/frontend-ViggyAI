import React from 'react'

const NavBar = ({LoginHandler,RegisterHandler,Logout,logout}) => {
    return<>
    <section className='HomeSection'>
      <div className="navSection">
          <div className="company">ViggyAI</div>
          {localStorage.getItem('Restaurant') && <div className="firmName">Restaurant Name: {localStorage.getItem('Restaurant')}</div>}
          <div className="Auth">
            {!Logout ? <>
              <span className="login" onClick={LoginHandler}>SignIn / </span>
              <span className="register" onClick={RegisterHandler}>SignUp</span></>:
              <span onClick={logout}> Logout</span>} 
          </div>
      </div>
    </section>
    </>
}

export default NavBar
