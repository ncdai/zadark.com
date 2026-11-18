import { useEffect, useState } from "react";
import Link from '@docusaurus/Link';
import styles from './styles.module.css'

type IProps = {
  url: string;
  children: React.ReactNode;
}

const DownloadCountdown: React.FC<IProps> = ({ url, children }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        const nextCount = prevCount - 1;

        if (nextCount <= 0) {
          clearInterval(timer);
        }

        return nextCount;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startDownload = () => {
    window.location.href = url;
  }

  const handleRetryDownloadClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    startDownload();
  }

  useEffect(() => {
    if (countdown === 0) {
      startDownload()
    }
  }, [countdown]);

  return (
    <div className="row">
      <div className="col col--8 col--offset-2">
        {countdown > 0 ? (
          <p className="text-center">
            Tập tin sẽ được tải xuống sau <span className={styles.countdown}>{countdown.toString().padStart(2, '0')} giây</span>
          </p>
        ) : (
          <p className="text-center">
            Vui lòng <a href="#" className={styles.countdown} onClick={handleRetryDownloadClick}>Nhấn vào đây</a> nếu tập tin vẫn chưa được tải xuống.
          </p>
        )}

        <div className="alert alert--warning margin-bottom--md" role="alert">
          <strong>ZaDark không chứa bất kỳ virus, mã độc nào</strong>. Nếu trình bảo vệ máy tính phát hiện tập tin cài đặt ZaDark có Virus, bạn tuyệt đối không tiếp tục mở tập tin và thông báo cho chúng tôi <Link to="/contact"><strong>tại đây</strong></Link>.
        </div>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default DownloadCountdown;
