import { useRecoilValue } from 'recoil';
import { textState } from '../store.js';

export default function ValueComponent() {

  const text = useRecoilValue(textState);

  return (
    <p>
      Value of the atom: <i>{text}</i>
    </p>
  );
}