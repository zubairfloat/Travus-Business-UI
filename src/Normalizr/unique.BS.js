import { normalize, schema } from 'normalizr';

export function businessNormalize(data) {
  const venueID = new schema.Entity('venue', {}, { idAttribute: '_id' });
  const venueNormalize = new normalize(data, [venueID]);
  return venueNormalize.entities;
}
export function businessSearchNormalize(data) {
  const venueID = new schema.Entity('venue', {}, { idAttribute: 'id' });
  const venueNormalize = new normalize(data, [venueID]);
  return venueNormalize.entities;
}

export function venuesId(data) {
  const convert = data.map( key => {
    let venueData = key._id
    return venueData
  })
  return convert
}