import Image from "next/image";
import Block from "@/comp/block";
import mePic from "../../public/me.jpg";
import cvPic from "../../public/cv.png";
import GitHubIcon from '@mui/icons-material/GitHub';
import Llink from "@/comp/link";
import Link from "next/link";
import DisplayArt from "@/comp/DisplayArt";
import { EmailShower } from "@/comp/sensitive";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr] items-center justify-items-center min-h-screen p-4 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DisplayArt
        className="fixed top-0 left-0 w-screen h-screen z-[-2] opacity-30 invisible sm:visible"
        />
      <main className="flex flex-col gap-4 items-start">
        <Block>
          <h1 className="text-4xl text-left font-[family-name:var(--font-geist-sans)]">
            Kacper Ozieblowski ✈️
          </h1>
        </Block>
        <div className="flex gap-4 max-w-lg items-start">
          <div className="flex w-full h-full flex-col gap-4 items-stretch">
            <Link href={'https://docs.google.com/viewer?url=https://github.com/Angramme/cv/raw/refs/heads/main/CV_OZIEBLOWSKI.pdf'} target="_blank">
              <Block nopad>
                <div className="rounded-lg grayscale aspect-square overflow-hidden">
                  <Image
                    className="object-cover hover:colo"
                    src={cvPic}
                    alt="cv"
                    />
                </div>
                <div className="p-4 opacity-60">
                  Curriculum Vitae
                </div>
              </Block>
            </Link>
            {/* </Block> */}
            <Block heading="Projects">
              <Link href='https://github.com/Angramme' target="_blank" className="hover:text-[var(--accent)]"><GitHubIcon/></Link> <br />
              <br />
              Highligts: <br />
              <Llink href='https://fractal.ozieblowski.dev/' target="_blank">fractal</Llink> <br />
              <Llink href='https://poly.ozieblowski.dev/' target="_blank">polyrhythm</Llink> <br />

            </Block>
            <Block heading="Creative Coding">
              <Llink href='https://www.shadertoy.com/user/Angramme' target="_blank">ShaderToy </Llink><br />
              <Llink href='https://shaderpark.com/user/angramme' target="_blank">ShaderPark </Llink><br />
              <Llink href='https://editor.p5js.org/kaoz/collections/BWUPOdDZq' target="_blank">p5.js </Llink><br />
              this background <br />
            </Block>
          </div>
          <div className="flex w-full h-full flex-col gap-4 items-stretch">
            <Block nopad>
              <div className="p-4 opacity-60">
                  My face
                </div>
              <Image className="rounded-lg grayscale aspect-[4/5] object-cover" src={mePic} alt={"me"} />
            </Block>
            <Block heading="Contact">
              <Llink href='https://www.linkedin.com/in/kacper-ozieblowski/' target="_blank">LinkedIn</Llink> <br />
              <EmailShower/> <br />
              <Llink href='abc' target="_blank">X</Llink> <br />
            </Block>
            {/* <Block heading="Blog">
              <Llink href='abc' target="_blank">Medium</Llink>
            </Block> */}
            <Block heading="Music">
              <Llink href='abc' target="_blank">SoundCloud</Llink>
            </Block>
          </div>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
