import { Card, Container, Grid, Text, Input, Switch, Textarea, Button, Popover } from '@nextui-org/react'
import React, { useState } from 'react'
import { MdTimer,MdTimerOff,MdOutlineWebAssetOff,MdTitle,MdPlaylistAdd } from 'react-icons/md'
import { BsCalendarDate } from 'react-icons/bs'
import { useFormik } from "formik";
import { auth, db } from './api/auth/firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, updateDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import * as Yup from 'yup';
import Link from 'next/link';


const index = () => {

  
  const [isReset, setReset] = useState(false)
  const [Time, setTime] = useState(false)
  const [date, setDate] = useState(false)
  const [userData, setUserdata] = useState()
  const [user, loading] = useAuthState(auth)

  


  const data = async() => {

        const dbRef = (collection(db, `${user.uid}`))
        await getDocs(dbRef).then((res) => {

        setUserdata(res.docs)
        

        })
  } 


  const formik = useFormik({
    initialValues: {
      title: '',
      message: '',
      time: '',
      date: '',
      completed: false,
    
    },
    validationSchema: Yup.object({
     title: Yup.string().min(4, 'Must be 4 letters or more')
     .max(15, 'Must be 15 letters or less').required('This field is required')
    }),

    onSubmit: async(values, {resetForm}) => {
    
      const databaseRef =  collection(db, `${user.uid}`)
      setReset(!isReset)
      resetForm()
      await addDoc(databaseRef, {
        title: values.title,
        message: values.message,
        time: values.time,
        date: values.date,
        completed: values.completed,
        
      }).then(data()).catch((error) => console.log(error))
      
      
    }});
  

 return (
  
  <Container css={{marginTop:'$2xl', width:'100%', marginBottom:'$xl'}}>
    {user ? data() &&
    <>

      <Card css={{alignItems:'center'}}>
        <Card.Header css={{justifyContent:'center'}}>
          {user.isAnonymous ?
             <Popover placement={'top'}>
             <Popover.Trigger>
               <Button auto bordered color="error">Important Notice</Button>
             </Popover.Trigger>
             <Popover.Content>
               <Text css={{ p: "$10" }}>
                 You're signed in as Anonymous, means if you signed out and resign in your data will be gone,
                 Use Providers to avoid data loss
               </Text>  
               </Popover.Content>
               </Popover> : null}
          
        </Card.Header>
        <Card.Body>
         <form onSubmit={formik.handleSubmit}>
            <Input 
                css={{marginTop:'$md'}}
                clearable
                bordered
                color="secondary"
                labelPlaceholder="Title"
                contentRight={<MdTitle size={40} />}
                onChange={formik.handleChange}
                name='title'
                aria-label='title'
                value={isReset ? '' : null}
              />
              {formik.errors.title ? <Text color='error' css={{marginTop:'$4'}}>{formik.errors.title}</Text> : null}

          <Grid css={{textAlign:'center', display:'flex', flexDirection:'column'}}>

            <Textarea
              placeholder="Enter a custom message"
              minRows={1}
              maxRows={6}
              color='secondary'
              bordered
              css={{marginBottom:'$md', marginTop:'$lg'}}
              onChange={formik.handleChange}
              name='message'
              aria-label='message'
              value={isReset ? '' : null}
            />

            <Switch shadow color="secondary" checked={false} css={{marginBottom:'$4'}}
             iconOff={<MdTimerOff />} iconOn={<MdTimer />} onChange={()=> setTime(!Time)}/>
             
             {Time && <Input aria-label='time' type={'time'}
               value={isReset ? '' : null} css={{marginLeft:'$xl'}} name='time' onChange={formik.handleChange}/>}
            
             <Switch shadow color="secondary" checked={false}
             iconOff={<MdOutlineWebAssetOff />} iconOn={<BsCalendarDate />} onChange={()=> setDate(!date)}/>

             {date && <Input aria-label='date' type={'date'}
             value={isReset ? '' : null} css={{marginLeft:'$xl'}} name='date' onChange={formik.handleChange}/>}
              
          
             
          </Grid>
          <Grid css={{marginTop:'$lg',textAlign:'center'}}>
          
          </Grid>
          <Grid css={{justifyContent:'center', display:'flex'}}>
          <Button bordered  color="gradient" icon={<MdPlaylistAdd size={20}/>} type='submit'>
            Add
          </Button>
          </Grid>
        </form>
        </Card.Body>
       
      </Card> 
      
      <Container display='flex' justify='center' css={{textAlign:'center', margin:'$xl'}}>
      
    {userData?.map((items, key) => (
    
    <Card css={{display:'flex',width:'400px', padding:'$xl', margin:'$xl', minWidth:'200px'}} key={key}>

      
     {items._document.data.value.mapValue.fields.completed.booleanValue == true 
       ? <Text size={20} color='success'>Completed</Text> : null }

      <Text color='secondary' size={30}
       css={items._document.data.value.mapValue.fields.completed.booleanValue == true
        ? {textDecoration:'line-through'}
        : {textDecoration:'none'}}>
    
        {items._document.data.value.mapValue.fields.title.stringValue}
        
        </Text>

      <Text color='error' size={20} 
         css={items._document.data.value.mapValue.fields.completed.booleanValue == true
        ? {textDecoration:'line-through'}
        : {textDecoration:'none'}}>{items._document.data.value.mapValue.fields.message.stringValue}</Text>
      <Text color='primary' size={18}   
        css={items._document.data.value.mapValue.fields.completed.booleanValue == true
        ? {textDecoration:'line-through'}
        : {textDecoration:'none'}}>{items._document.data.value.mapValue.fields.time.stringValue}</Text>
      <Text color='primary' size={18}   
        css={items._document.data.value.mapValue.fields.completed.booleanValue == true
        ? {textDecoration:'line-through'}
        : {textDecoration:'none'}}>{items._document.data.value.mapValue.fields.date.stringValue}</Text>
    
      <Button  color={'gradient'} css={{marginTop:'$md', minWidth:'auto'}} onClick={async() => {
          const docRef =  doc(db, `${user.uid}`, items.id)
            await updateDoc(docRef, {
              completed: true
            })
            data()
       }}>Mark as Completed</Button>

      <Button color={'error'} css={{marginTop:'$md', minWidth:'auto'}} onClick={async() => {
        const docRef = doc(db, `${user.uid}`, items.id)
         await deleteDoc(docRef)
         data()
        }}>Delete</Button>

    </Card>
   ))}
  </Container></>
      
   : <Card css={{marginLeft:'auto', marginRight:'auto', width:'300px'}}>
            <Card.Body css={{textAlign:'center'}}><Link href='/login'>Login to view this page</Link></Card.Body>
      </Card>}

  </Container>
 )
}



export default index