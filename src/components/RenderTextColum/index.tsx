import { Tooltip } from 'antd';
import styles from './styles.less'
interface Props {
	name?: string
	nameStyle?: any
	des?: string
	onClick?(): void
	bold?: boolean
}

const RenderTextColumn = (props: Props) => {
	const { name, onClick, des } = props;

	return (
		<span className={styles.renderText} style={{ cursor: onClick && "pointer" }} onClick={onClick}>
			<Tooltip placement="topLeft" title={name + (des ? ` - ${des}` : "")}>
				<div className={styles.dGrid}>
					<div className={styles.name} style={props.nameStyle} >
						{props.bold ? <b>{name || "-"}</b> : name || ""}
					</div>
					{des
						? <div className={styles.name} style={props.nameStyle} >
							{des}
						</div>
						: null
					}
				</div>
			</Tooltip>
		</span>
	);
};

export default RenderTextColumn;
