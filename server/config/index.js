export const secret = 'jwt_secret'

export const notCheckToken = ['/api/login', '/api/register', '/upload']

export const upload = {
  'types': ['.jpg', '.jpeg', '.png', '.gif', '.json', '.yml', '.yaml'],
  'size': 5242880,
  'dir': '../public/upload',
  'expire': {
    'types': ['.json', '.yml', '.yaml'],
    'day': -1
  }
}
