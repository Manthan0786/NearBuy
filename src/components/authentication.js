import { jwt } from 'jsonwebtoken';

function verifyJWT(token) {
    return jwt.verify(token, JWT_SECRET);
}

const Authenticated = (next) => (root, args, context, info) => {
    if (!context.request || !context.request.headers) {
      throw new Error('Not authenticated');
    }
  
    const token = context.request.headers.authorization;
    if (!token) {
      throw new Error('Not authenticated');
    }
  
    const user = verifyJWT(token);
    if (!user) {
      throw new Error('Not authenticated');
    }
  
    return next(root, args, { ...context, user }, info);
  };
  
  export default Authenticated;