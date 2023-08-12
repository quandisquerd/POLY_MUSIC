
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
import { Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
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
    // Hàm để bắt đầu phát bài hát
    const togglePlay = (index: any) => {
        if (index === currentPlayingIndex) {
            // Kiểm tra xem bài hát đang phát đã hoàn thành hay chưa
            const audioElement: any = document.getElementById(`audio-${index}`);
            console.log(audioElement.duration);

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
    const handleTimeUpdate = (index: any, event: any) => {
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




    return (
        <>
            <div className="music_area music_gallery" >
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section_title text-center mb-65">
                                <h3>Latest Tracks</h3>
                            </div>
                        </div>
                    </div>
                    {isLoading ? (<Skeleton />) : (data?.map((data: any, index: any) => {
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
                                                            <h4>{data.name}</h4>
                                                            <p>10 November, 2019</p>
                                                        </div>
                                                        <audio  id={`audio-${index}`} preload="auto" onTimeUpdate={(event) => handleTimeUpdate(index, event)}>
                                                            <source src={data.file} />

                                                        </audio>
                                                        <hr />
                                                        {isCurrentPlaying ? <div style={{ width: `${giaytongs}%`, height: '5px', backgroundColor: 'black', marginTop: '30px' }}>
                                                            <div style={{ width: `${widthPercentages}%`, height: '100%', backgroundColor: 'red', marginTop: '30px' }}> </div>
                                                        </div> : <div style={{ width: `100%`, height: '5px', backgroundColor: 'black', marginTop: '30px' }}></div>}
                                                        {isCurrentPlaying ? (<>{startmin} :{startsec}  /</>) : ""} {isCurrentPlaying ? (<>{min} :{sec}</>) : ""}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-md-3">
                                                <div className="music_btn">
                                                    <Button className="boxed-btn" style={{ height: '50px', width: '120px', backgroundColor: currentPlayingIndex === index && isPlaying ? 'red' : 'white' }} onClick={() => togglePlay(index)}>
                                                        {isCurrentPlaying && isPlaying ? <FontAwesomeIcon color='white' icon={faStop} /> : <FontAwesomeIcon icon={faPlay} />}
                                                    </Button>
                                                    <h4> </h4>
                                                    <Button className="boxed-btn" style={{ height: '50px', width: '120px' }}><Link to={`${data.id}`}>Detail</Link></Button>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    }))}

                </div>
            </div>

        </>
    )
}

export default Musics