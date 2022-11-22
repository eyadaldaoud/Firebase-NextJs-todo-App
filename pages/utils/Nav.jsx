import React from 'react'
import { Avatar, Navbar, Text, useTheme, Dropdown, Link as Uilink, Switch, Button, Loading } from '@nextui-org/react'
import Link from 'next/link';
import { useTheme as useNextTheme } from 'next-themes'
import { FcTodoList } from 'react-icons/fc'
import { TbMoonStars } from 'react-icons/tb'
import { BsSun } from 'react-icons/bs'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../api/auth/firebase-config';



const Nav = () => {


  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [user, loading] = useAuthState(auth)


  const signOut = async() => {
    
    auth.signOut()

  } 

    return (
      
      <Navbar isBordered variant="floating">
      
      
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        
        <Text b color="secondary">
          To-Do App
        </Text>
        <FcTodoList size={20}/>
        
        
      </Navbar.Brand>
      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <Navbar.Brand>
          <Switch 
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
              iconOn={<TbMoonStars />}
              iconOff={<BsSun />}
              bordered
              color={'secondary'}
              size={'lg'}/>
        </Navbar.Brand>
                
        {loading ? <Loading color={'secondary'} ></Loading>
     
          : user ? <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src={user.isAnonymous === true ? "https://openclipart.org/image/800px/288357" : user.photoURL}
              /> 
              
            
          </Dropdown.Trigger>
            
          </Navbar.Item>

          <Dropdown.Menu
            aria-label="menu actions"
            color="secondary"
          >
            <Dropdown.Item css={{ height: "$18" }} textValue='null'>
              <Text  color="inherit" css={{ d: "flex" }}>
                Signed in as 
              </Text>
              <Text  color="inherit" css={{ d: "flex" }} >
                {user?.providerData[0]?.providerId === "github.com" ?
                 user?.reloadUserInfo.screenName : user?.isAnonymous === true ?
                  <Text>Anonymous</Text>: user?.displayName}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item  withDivider textValue='null'>
              <Link href='/' color={''}>
                Add/View my ToDo's
              </Link>

            </Dropdown.Item>
            <Dropdown.Item  withDivider color="error" textValue='null'>
              <Text onClick={signOut}>
              Log Out
              </Text>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        : <Button shadow color="secondary" auto><Link href={'/login'}><Text color='white'>Login</Text></Link></Button>}

      </Navbar.Content>
    
    </Navbar>
      
      )

    }


export default Nav