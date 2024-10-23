"use client";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";

const Share = ({ urlTwitter, urlFacebook, urlWhatsapp, urlEmail }) => {
  return (
    <div className="space-y-2">
      <p>Share : </p>
      <div className="space-x-2">
        {urlTwitter && (
          <TwitterShareButton url={urlTwitter}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        )}
        {urlFacebook && (
          <FacebookShareButton url={urlFacebook}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        )}
        {urlWhatsapp && (
          <WhatsappShareButton url={urlWhatsapp}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        )}
        {urlEmail && (
          <EmailShareButton url={urlEmail}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        )}
      </div>
    </div>
  );
};

export default Share;
