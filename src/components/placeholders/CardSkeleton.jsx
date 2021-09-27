import {
  TextBlock,
  MediaBlock,
  TextRow,
  RectShape,
  RoundShape
} from 'react-placeholder/lib/placeholders'

import 'react-placeholder/lib/reactPlaceholder.css'

function CardSkeleton () {
  return (
    <div className='card'>
      <RectShape color='#e7e7e7' style={{ minHeight: 500, width: '100%' }} />
      <TextBlock color='#red' rows={2} />
    </div>
  )
}

export default CardSkeleton
