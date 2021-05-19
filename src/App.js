import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'

function App () {
  const [db, setDb] = useState([])
  const [isUpdating, setIsUpdating] = useState(null)
  const { register, handleSubmit, reset, setValue } = useForm()

  useEffect(() => {
    if (isUpdating) {
      const findValue = db.find(value => value.userId === isUpdating)
      setValue('userName', findValue.userName)
    }
  }, [isUpdating, setValue, db])

  const onSubmit = values => {
    const { userId, userName } = values
    if (isUpdating) {
      setDb(
        db.map(value => {
          if (value.userId === isUpdating) {
            return {
              ...value,
              userName
            }
          }

          return value
        })
      )

      setIsUpdating(null)
      reset()
      return
    }

    const numberId = parseInt(userId, 10)
    setDb(prev => {
      if (prev.includes(numberId)) {
        return [...prev]
      }
      reset()
      return [...prev, { userId: numberId, userName }]
    })
  }

  const handleDelete = id => {
    const copy = db.slice()
    setDb(copy.filter(value => value !== id))
  }

  const handleUpdate = id => {
    setIsUpdating(id)
  }

  const list = db.map(value => {
    return (
      <span style={{ display: 'block' }} key={value.userId}>
        Read: User Id: {value.userId} - User name: {value.userName}
        <button onClick={() => handleDelete(value.userId)}>Delete</button>
        <button onClick={() => handleUpdate(value.userId)}>Update</button>
      </span>
    )
  })

  return (
    <div className='App'>
      <header className='App-header'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isUpdating && (
            <div>
              <label htmlFor='userId'>Id:</label>
              <input type='number' id='userId' {...register('userId')} />
            </div>
          )}
          <div>
            <label htmlFor='userName'>Name:</label>
            <input type='text' id='userName' {...register('userName')} />
          </div>
          <button>{isUpdating ? 'Update Value' : 'Create'}</button>
        </form>
        <div>{list}</div>
      </header>
    </div>
  )
}

export default App
