import User from './User'

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th style={{ textAlign: 'left', paddingLeft: '20px' }}>
              blogs created
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <User user={user} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
