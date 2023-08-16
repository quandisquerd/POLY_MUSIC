
import { useGetMusicQuery } from '../api/music';
import 'plyr/dist/plyr.css';
import './css/bootstrap.min.css'
import './css/owl.carousel.min.css'
import './css/magnific-popup.css'
import "./css/font-awesome.min.css"
import "./css/themify-icons.css"
import "./css/audioplayer.css"
import "./css/flaticon.css"
import "./css/gijgo.css"
import "./css/animate.css"
import "./css/slick.css"
import "./css/slicknav.css"
import "./css/style.css"
import './music.css'
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faFastForward } from '@fortawesome/free-solid-svg-icons';
const Musics = () => {
    const { data, isLoading } = useGetMusicQuery('')
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null); // State lưu index bài hát đang chạy
    const [widthPercentages, setWidthPercentages] = useState<any>()
    const [giaytongs, setgiaytong] = useState(0)
    const [sec, setsec] = useState(0)
    const [min, setmin] = useState(0)
    const [startsec, setstartsec] = useState(0)
    const [startmin, setstartmin] = useState(0)
    const [nameMusic, setnameMusic] = useState('')
    const [imageMusic, setimageMusic] = useState('')
    const [indexs, setindex] = useState(0)
    // Hàm để bắt đầu phát bài hát
    const togglePlay = (index: any) => {
        setindex(index)
        if (index === currentPlayingIndex) {
            // Kiểm tra xem bài hát đang phát đã hoàn thành hay chưa
            const audioElement: any = document.getElementById(`audio-${index}`);
            if (audioElement && audioElement.currentTime === audioElement.duration) {
                audioElement.currentTime = 0; // Quay lại thời gian 0 nếu bài hát đã kết thúc
            }
            setIsPlaying(!isPlaying); // Đảo ngược trạng thái phát/dừng
        } else {
            if (currentPlayingIndex !== null) {
                const audioElement: any = document.getElementById(`audio-${currentPlayingIndex}`);
                if (audioElement) {
                    audioElement.pause(); // Dừng bài hát đang chạy trước khi phát bài mới
                    audioElement.currentTime = 0;
                }
            }
            setCurrentPlayingIndex(index);
            setIsPlaying(true); // Phát bài hát mới
        }
        const audioElement: any = document.getElementById(`audio-${index}`);
        if (audioElement) {
            if (isPlaying && index === currentPlayingIndex) {
                audioElement.pause(); // Dừng âm thanh
            } else {
                audioElement.play(); // Phát âm thanh
            }
        }
    };
    const handleTimeUpdate = (index: any, event: any, name: any, image: any) => {
        setnameMusic(name);
        setimageMusic(image)
        const audioElement = event.target;
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration;
        const s = Math.floor(duration % 60)
        setsec(s);
        const m = Math.floor(duration / 60)
        setmin(m);
        const giay = Math.floor(currentTime);
        let giays = Math.floor(currentTime % 60);
        let phut = Math.floor(currentTime / 60);
        if (giays > 60) {
            giays = 0;
            phut += 1;
            console.log(giays, phut);
            setstartsec(giays)
            setstartmin(phut)
        } else {
            setstartsec(giays)
            setstartmin(phut)
        }
        const giaytong = Math.ceil(duration);
        const widthPercentage = parseFloat((giay / giaytong * 100).toFixed(1));
        const phanTram = Number(giaytong / giaytong) * 100;
        setWidthPercentages(widthPercentage);
        setgiaytong(phanTram)

    }
    const handleFastForward = (increase: any) => {
        const audioElement: any = document.getElementById(`audio-${indexs}`);
        if (increase) {
            let newTime = audioElement.currentTime + 5;
            audioElement.currentTime = newTime;
            let giays = Math.floor(newTime % 60);
            setstartsec(giays)
        } else {
            let newTime = audioElement.currentTime - 5;
            audioElement.currentTime = newTime;
            let giays = Math.floor(newTime % 60);
            setstartsec(giays)
        }
    }




    const outerRef: any = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [widthPercentage, setWidthPercentage] = useState(50);
    const handleMouseDown = (e: any) => {
        setIsDragging(true);
    };

    const handleMouseMove = (e: any) => {
        if (!isDragging) return;

        const outerWidth = outerRef.current.offsetWidth;
        const mouseX = e.clientX - outerRef.current.getBoundingClientRect().left;

        const clampedWidth = Math.min(outerWidth, Math.max(0, mouseX));
        const newPercentage = (clampedWidth / outerWidth) * 100;

        setWidthPercentage(newPercentage);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };
    return (
        <>
            <div className="music_area music_gallery" style={{ backgroundColor: 'rgb(29, 29, 40)' }}>
                <div className="container" style={{ backgroundColor: 'black', marginBottom: '60px', borderRadius: '7px' }}>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section_title text-center mb-65">
                                <h3 style={{ color: 'white', paddingTop: '40px' }}>Latest Tracks</h3>
                            </div>
                        </div>
                    </div>
                    {isLoading ? (<><div className="loader">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                        <div className="bar4"></div>
                        <div className="bar5"></div>
                        <div className="bar6"></div>
                        <div className="bar7"></div>
                        <div className="bar8"></div>
                        <div className="bar9"></div>
                        <div className="bar10"></div>
                        <div className="bar11"></div>
                        <div className="bar12"></div>
                    </div>
                        <h1 style={{ paddingTop: '500px' }}></h1></>) : (data?.data?.map((data: any, index: any) => {
                            const isCurrentPlaying = index === currentPlayingIndex;
                            return (
                                <>
                                    <div className="row align-items-center justify-content-center mb-20">
                                        <div className="col-xl-10">
                                            <div className="row align-items-center">
                                                <div className="col-xl-9 col-md-9">
                                                    <div className="music_field">
                                                        <div className="thumb">
                                                            <img src={data.image} alt="" />
                                                        </div>
                                                        <div className="audio_name">
                                                            <div className="name">
                                                                <h4 style={{ color: 'white' }}>{data.name}</h4>
                                                                <p>10 November, 2019</p>
                                                            </div>
                                                            <audio id={`audio-${index}`} preload="auto" onTimeUpdate={(event) => handleTimeUpdate(index, event, data.name, data.image)}>
                                                                <source src={data.file} />
                                                            </audio>
                                                            <hr />
                                                            {isCurrentPlaying && isPlaying ? <div className="loaders" style={{ marginBottom: '-30px' }}>
                                                                <div className="bar green"></div>
                                                                <div className="bar yellow"></div>
                                                                <div className="bar blue"></div>
                                                                <div className="bar violet"></div>
                                                                <div className="bar red"></div>
                                                                <div className="bar orange"></div>
                                                                <div className="bar blue"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar yellow"></div>
                                                                <div className="bar red"></div>
                                                                <div className="bar orange"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar yellow"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar blue"></div>
                                                                <div className="bar violet"></div>
                                                                <div className="bar blue"></div>

                                                                <div className="bar orange"></div>
                                                                <div className="bar red"></div>
                                                                <div className="bar orange"></div>
                                                                <div className="bar yellow"></div>
                                                                <div className="bar green"></div>

                                                                <div className="bar violet"></div>
                                                                <div className="bar blue"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar yellow"></div>
                                                                <div className="bar orange"></div>
                                                                <div className="bar orange"></div>
                                                                <div className="bar orange"></div>
                                                                <div className="bar yellow"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar blue"></div>
                                                                <div className="bar violet"></div>
                                                                <div className="bar blue"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar blue"></div>
                                                                <div className="bar yellow"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar orange"></div>
                                                                <div className="bar blue"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar orange"></div>
                                                                <div className="bar yellow"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar blue"></div>
                                                                <div className="bar violet"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar yellow"></div>
                                                                <div className="bar blue"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar yellow"></div>
                                                                <div className="bar orange"></div>
                                                                <div className="bar red"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar orange"></div>
                                                                <div className="bar yellow"></div>
                                                                <div className="bar green"></div>
                                                                <div className="bar blue"></div>
                                                                <div className="bar orange"></div>
                                                            </div> : ""}
                                                            {isCurrentPlaying ? <div className='tong' style={{ width: `${giaytongs}%`, height: '3px', backgroundColor: 'white', marginTop: '30px', position: 'relative', }}>
                                                                <div style={{ width: `${widthPercentages}%`, height: '100%', backgroundColor: 'red', marginTop: '30px', position: 'relative', }}><div className="child"
                                                                    style={{
                                                                        position: 'absolute', // Để có thể định vị phần tử con theo vị trí tuyệt đối
                                                                        top: '-5px', // Điều chỉnh vị trí theo y (lên trên)
                                                                        right: '0', // Điều chỉnh vị trí theo x (phải)
                                                                        width: '10px', // Độ rộng của chấm đỏ
                                                                        height: '10px', // Chiều cao của chấm đỏ
                                                                        backgroundColor: 'bue',
                                                                        borderRadius: '50%', // Để tạo hình tròn
                                                                        display: 'none', // Ẩn ban đầu
                                                                    }}
                                                                ></div> </div>
                                                            </div> : <div style={{ width: `100%`, height: '3px', backgroundColor: 'white', marginTop: '30px' }}></div>}
                                                            {isCurrentPlaying ? (<><span style={{ color: 'white' }}>{startmin} :{startsec}</span>  /</>) : ""} {isCurrentPlaying ? (<><span style={{ color: 'white' }}>{min} :{sec}</span></>) : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-md-3">
                                                    <div className="music_btn">
                                                        <Button className="boxed-btn" style={{ height: '50px', width: '120px', backgroundColor: currentPlayingIndex === index && isPlaying ? 'red' : 'white' }} onClick={() => togglePlay(index)}>
                                                            {isCurrentPlaying && isPlaying ? <FontAwesomeIcon color='white' icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                                                        </Button>
                                                        <h4> </h4>
                                                        <Button className="boxed-btn" style={{ height: '50px', width: '120px' }}><Link to={`${data.id}`}>Detail</Link></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <br />
                                    <br />
                                    <hr style={{ backgroundColor: 'gray' }} />
                                    <br />
                                    <br />
                                </>
                            )
                        }))}
                </div>
            </div>
            <div className="progress-bar-container" style={{ width: '100%', margin: '0px auto' }} >
                <div
                    style={{ width: '60%', display: 'flex', float: 'left', margin: '0px 19%' }}
                >
                    <div style={{
                        width: '110px', marginLeft: '20px', marginTop: '24px'
                    }}>
                        <FontAwesomeIcon icon={faFastForward} flip="horizontal" style={{ marginRight: ' 20px', color: 'white', width: '10%' }} onClick={() => handleFastForward(false)} />

                        {isPlaying && currentPlayingIndex ? <FontAwesomeIcon color='white' icon={faPause} /> : <FontAwesomeIcon color='red' icon={faPlay} />}

                        <FontAwesomeIcon icon={faFastForward} style={{ marginLeft: '20px', color: 'white', width: '10%' }} onClick={() => handleFastForward(true)} />
                    </div>
                    <span style={{ color: 'red', marginTop: '27px', width: '40px', fontSize: '12px' }}>{startmin} :{startsec} </span>
                    <div style={{ marginLeft: '15px', width: '60%', marginTop: '5px' }} className='outer' ref={outerRef}>
                        <div style={{
                            width: `${giaytongs}%`,
                            height: '1px',
                            backgroundColor: 'white',
                            marginTop: '30px',
                            marginBottom: '5px',
                            position: 'relative',
                            transition: 'width 0.2s',
                        }}
                            className="outer-div" >
                            <div style={{
                                width: `${widthPercentages}%`,
                                height: '100%',
                                backgroundColor: 'red',
                                marginTop: '30px',
                                position: 'relative',
                                display: 'flex',
                            }} onMouseDown={handleMouseDown}
                                className="inner-div" >

                            </div>
                        </div>
                    </div>
                    <span style={{ marginLeft: '20px', color: 'white', marginTop: '27px', width: '50px', fontSize: '12px' }}>{min} :{sec}</span>
                    <div style={{
                        width: '20%', marginLeft: '20px', marginTop: '25px', color: 'white', display: 'flex'
                    }}>
                        <img width='15%' height='20px' src={imageMusic} alt="" />
                        <span style={{ marginLeft: '5px' }}> </span>
                        <span style={{ fontSize: '12px' }}>{nameMusic}</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Musics