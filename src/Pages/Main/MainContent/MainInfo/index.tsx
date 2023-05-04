import { InfoModalProps } from './types';

export const MainInfo = ({ icon, text, value }: InfoModalProps) => {
	return (
		<div
			className="text-0 p-4 flex align-items-center"
			style={{ background: '#4ED9BF', borderRadius: '10px' }}
		>
			<div
				className="flex justify-content-center align-items-center border-circle"
				style={{
					background: 'rgba(255, 255, 255, 0.25)',
					width: '75px',
					height: '75px',
				}}
			>
				<i className={`${icon} text-4xl`}></i>
			</div>
			<div className="ml-2">
				<span>{text}</span> <br />
				<span className="font-bold text-xl mt-1">{value}</span>
			</div>
		</div>
	);
};
