import React, { useState, useEffect, useRef } from 'react';
import styles from './AudioPlayer.module.scss';
import PlayIcon from '@/assets/play.svg';
import PauseIcon from '@/assets/pause.svg';
import Icon from '../Icon/Icon';

interface AudioPlayerProps {
  audioBlob?: Blob | null;
  onClose?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioBlob, onClose }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [isHoveringProgress, setIsHoveringProgress] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAudioUrl(null);
    }
  }, [audioBlob]);

  const handlePlayPause = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'record.mp3';
      link.click();
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (audioRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const progressPercentage = clickPosition / rect.width;
      const newTime = progressPercentage * (audioRef.current.duration || 0);
      audioRef.current.currentTime = newTime;
    }
  };

  const handleProgressBarHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const hoverPosition = e.clientX - rect.left;
      const progressPercentage = hoverPosition / rect.width;
      setHoverPosition(progressPercentage);
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  if (!audioUrl) {
    return <div className={styles.audioPlayerPlaceholder}>Аудиофайл не загружен</div>;
  }

  return (
    <div className={styles.audioPlayerContainer}>
      <div className={styles.audioControls}>
        <span className={styles.durationText}>{duration ? formatTime(duration) : '--:--'}</span>
        <button className={styles.playButton} onClick={handlePlayPause}>
          {isPlaying ? (
            <img width={24} height={24} src={PauseIcon} alt="pause" />
          ) : (
            <img width={24} height={24} src={PlayIcon} alt="play" />
          )}
        </button>
        <div
          className={styles.progressBarContainer}
          onMouseEnter={() => setIsHoveringProgress(true)}
          onMouseLeave={() => {
            setIsHoveringProgress(false);
            setHoverPosition(null);
          }}
          onClick={handleProgressBarClick}
          onMouseMove={handleProgressBarHover}
          ref={progressBarRef}
        >
          <audio
            ref={audioRef}
            src={audioUrl}
            onLoadedMetadata={(e) => {
              const audio = e.target as HTMLAudioElement;
              setDuration(audio.duration);
            }}
            onTimeUpdate={(e) => {
              const audio = e.target as HTMLAudioElement;
              if (progressBarInnerRef.current && audio.duration) {
                progressBarInnerRef.current.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
              }
            }}
            style={{ display: 'none' }}
          />
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} ref={progressBarInnerRef}></div>
          </div>
          {isHoveringProgress && hoverPosition !== null && (
            <span
              className={styles.hoverTime}
              style={{
                left: `${hoverPosition * 100}%`,
                transform: `translateX(-50%)`,
              }}
            >
              {formatTime((hoverPosition * (duration || 0)))}
            </span>
          )}
        </div>
        <button className={styles.downloadButton} onClick={handleDownload}>
          <Icon name={'download'} className={styles.downloadIcon} />
        </button>
        <button className={styles.closeButton} onClick={handleClose}>
          <Icon name={'close'} className={styles.closeIcon} />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;