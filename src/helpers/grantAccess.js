import { accessCodes } from './accessCodes';


export const grantAccess = (props) => {
  const accessCodeQuery = 'access_code=';
  const userAccessCode = props.location.search.substring(props.location.search.indexOf(accessCodeQuery) + accessCodeQuery.length, props.location.search.length);
  const allAccessCodes = Object.keys(accessCodes);

  let accessGranted = false;

  if (allAccessCodes.includes(userAccessCode)) {
    accessGranted = true;
  }

  return accessGranted;
}
