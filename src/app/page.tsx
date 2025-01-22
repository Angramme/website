import Image from "next/image";
import Block from "@/comp/block";
import mePic from "../../public/me.jpg";
import cvPic from "../../public/cv.png";
import GitHubIcon from '@mui/icons-material/GitHub';
import Llink from "@/comp/link";
import Link from "next/link";
import DisplayArt from "@/comp/DisplayArt";
import { EmailShower } from "@/comp/sensitive";
import Scroll from "@/comp/scroll";

function Col({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full h-full flex-col gap-20 sm:gap-4 items-stretch">
    {children}
  </div>;
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-items-center min-h-screen p-3 sm:p-4 font-[family-name:var(--font-geist-sans)]">
      <Scroll />
      <DisplayArt />
      <div className="min-h-screen flex flex-col justify-center">
        <div className="flex flex-col gap-4 items-start">
          <Block>
            <h1 className="text-3xl text-left font-[family-name:var(--font-geist-sans)]">
              🚀 Kacper Ozieblowski
            </h1>
          </Block>
          <div className="flex gap-4 max-w-lg items-start">
            <Col>
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
                <Link href='https://github.com/Angramme' target="_blank" className="hover:text-[var(--accent)]"><GitHubIcon /></Link> <br />
                <br />
                Highligts: <br />
                <Llink href='https://fractal.ozieblowski.dev/' target="_blank">fractal</Llink> <br />
                <Llink href='https://poly.ozieblowski.dev/' target="_blank">polyrhythm</Llink> <br />

              </Block>
              <Block heading="Creative Coding">
                <Llink href='https://www.shadertoy.com/user/Angramme' target="_blank">ShaderToy </Llink><br />
                <Llink href='https://shaderpark.com/user/angramme' target="_blank">ShaderPark </Llink><br />
                <Llink href='https://editor.p5js.org/kaoz/collections/BWUPOdDZq' target="_blank">p5.js </Llink><br />
                <span className="hidden sm:inline italic">
                  <Llink disabled>this background</Llink>
                </span>
                <br />
              </Block>
            </Col>
            <Col>
              <Block nopad>
                <div className="p-4 opacity-60">
                  My face
                </div>
                <Image className="rounded-lg grayscale aspect-[4/5] object-cover" src={mePic} alt={"me"} />
              </Block>
              <Block heading="Contact">
                <Llink href='https://www.linkedin.com/in/kacper-ozieblowski/' target="_blank">LinkedIn</Llink> <br />
                <EmailShower /> <br />
                <Llink href='https://x.com/kozieblowski' target="_blank">X</Llink> <br />
              </Block>
              {/* <Block heading="Blog">
                <Llink href='abc' target="_blank">Medium</Llink>
              </Block> */}
              <Block heading="Music">
                {/* <Llink href='abc' target="_blank">SoundCloud</Llink> */}
                Hidden for now...
              </Block>
            </Col>
          </div>
        </div>
      </div>
      <footer className="mt-20 z-[-1] p-2 text-sm text-center text-[var(--foreground)]">
        Copyright © {new Date().getFullYear()} Kacper Ozieblowski
      </footer>
    </main>
  );
}
