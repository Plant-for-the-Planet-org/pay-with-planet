import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckBox(props: any) {
  const CheckBox = withStyles({
    root: {
      '& .MuiSvgIcon-root path': {
        fill: '#68B030',
      },
    },
    checked: {},
  })(Checkbox);
  return (
    <CheckBox
      color={props.color}
      checked={props.checked}
      onChange={props.onChange}
      name={props.name}
      inputProps={props.inputProps}
      id={props.id}
    />
  );
}
