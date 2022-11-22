import { Card, Container, Text, Grid, Button } from '@nextui-org/react'
import { AiFillGithub, AiFillApple } from 'react-icons/ai'
import { BsGoogle } from 'react-icons/bs'
import { FaUserSecret } from 'react-icons/fa'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Github, Google, Anonymous } from './api/auth/Providers'
import { auth } from './api/auth/firebase-config'
import { useRouter } from 'next/router'


const login = () => {

    
    const [user, loading] = useAuthState(auth)

    const router = useRouter()

    const signInwGoogle = () => {

        Google()
    }

    const signInwGithub = () => {

        Github()
    }
    const signAnonymous = () => {

        Anonymous()
    }
    

  return (
    <Container css={{marginTop:'$4xl', width:'100%', marginBottom:'xl'}}>
        {!user ? 
        <Card>
            <Card.Header css={{justifyContent:'center'}}>
                <Text size={40}>Sign in with your Favourite providers</Text>
            </Card.Header>
            <Card.Body css={{alignItems:'center'}}>
                <Grid><Button shadow="true" color={'gradient'} css={{margin:'$4', fontSize:'$xl'}}
                 icon={<BsGoogle />} bordered  onPress={signInwGoogle}>Google</Button></Grid>
                <Grid><Button shadow="true" color={'gradient'} css={{margin:'$4', fontSize:'$xl'}}
                 icon={<AiFillGithub />} bordered  onPress={signInwGithub}>Github</Button></Grid>
                 <Grid><Button shadow="true" color={'gradient'} css={{margin:'$4', fontSize:'$xl'}}
                 icon={<FaUserSecret />} bordered  onPress={signAnonymous}>Anonymous</Button></Grid>
            </Card.Body>
            
        </Card> 
        : setTimeout(() => {
            router.push('/')
        }, 0)}
    </Container>
  )
}


export default login