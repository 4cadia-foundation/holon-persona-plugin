import {Row, Col} from 'react-bootstrap';
import React, { Component } from 'react';
import Settings from '../../../config/settings';
import './Ipfs.css';
import IPFS from 'ipfs-http-client';

const ipfs = new IPFS({ host: Settings.ipfs.host, port: Settings.ipfs.port, protocol: Settings.ipfs.protocol});

class Ipfs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ipfsHash: null,
            buffer: '',
            formIPFS: '',
            imgUrl: '',
    }
    this.captureFile = this.captureFile.bind(this);
    this.convertToBuffer = this.convertToBuffer.bind(this);
    this.handleSubmitIPFS = this.handleSubmitIPFS.bind(this);
  }
  captureFile(event) {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)    
  }
    async convertToBuffer(reader) {
        const buffer = await Buffer.from(reader.result)
        this.setState({
          buffer: buffer,
        })
    }
    async handleSubmitIPFS(event) {
        event.preventDefault()
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
          if (err) {
            console.error(err.message)
            this.setState({
              buffer: '',
              statusMsg: err.message,
            })
            return
        }
          console.log('handleClick/sucesso/ipfsHash', ipfsHash)
          this.setState({
            formIPFS: ipfsHash[0].hash,
          })   
          this.props.emitIpfsHash(ipfsHash[0].hash);
        })
      }
      render() {
        return (
            <Row>
                <Col>
                    <form className="title text-center margin-top-30" onSubmit={this.handleSubmitIPFS}>
                      <div className="ipfs-image">
                        <p>Select file to confirm your data</p>
                        <input type="file" name="fileToSend" id="fileToSend" onChange={this.captureFile} />
                        <br />
                        <button type="submit">Send it</button>
                      </div>
                      <label className="paragraph label-add titulo-ipfs">Your hash</label>
                      <div className="hash-ipfs">
                        <div className="hash-ipfs-return">
                          {this.state.formIPFS}
                        </div>
                      </div>
                  </form>
                </Col>
            </Row>
)}};
export default Ipfs;