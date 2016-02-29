import React from "react";

class DownAppDialog extends React.Component {

	componentDidMount() {

	}
	CloseDialog() {
		this.setState({
			isShowDialog: this.state.isShowDialog ^ 1
		})
		this.showState = 'hide';
		this.props.dialogCallback('close');
	}
	render() {
		return (
			<div className={styles[this.showState]}>
				<div className={styles['dialog-bg']}></div>
				<div className={styles.dialog}>
					<div className={styles['close-btn']} onClick={ this.CloseDialog.bind(this) } >
						<i></i>
					</div>
					<div className={styles.content}>
						<div className={styles['dialog-tips']}>
							<div className={styles.logo}>
								<img src="/img/icon/logo_icon.png" />
							</div>
							<div className={styles['dialog-tips-text']}>该功能需要指点客户端支持</div>
						</div>
						<div className={styles['dialog-title']}>
							<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.luoteng.folk" className={styles['down-app'] + ' ' + styles['down-btn'] }>立即打开</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DownAppDialog;