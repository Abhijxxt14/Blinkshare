import { useState } from 'react'

function App() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [downloadCode, setDownloadCode] = useState('');
  const [uploadResult, setUploadResult] = useState(null);

  // Dynamically determine the backend URL based on the current host IP.
  // This is vital for cross-device access on your local network!
  // In production, it uses the VITE_API_URL environment variable.
  const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadResult(null);
      setUploadMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadMessage('Uploading...');
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUploadMessage('Success!');
      setUploadResult(data);
    } catch (error) {
      console.error(error);
      setUploadMessage('Error uploading file. Check connection.');
    }
  };

  const handleRetrieve = () => {
    if (!downloadCode) {
      alert('Please enter a code.');
      return;
    }
    window.open(`${API_BASE}/file/${downloadCode}`, '_blank');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>File Share</h1>
      
      {/* Upload Section */}
      <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
        <h2>Upload File</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} style={{ padding: '8px 16px' }}>Upload</button>
        </div>
        {uploadMessage && <p style={{ marginTop: '10px', color: '#555' }}>{uploadMessage}</p>}
        
        {uploadResult && (
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>File Ready!</h3>
            <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#666' }}>Scan to download on another device:</p>
            <img 
              src={`${API_BASE}/qr/${uploadResult.code}`} 
              alt="QR Code" 
              style={{ width: '200px', height: '200px', display: 'block', margin: '0 auto', border: '1px solid #ddd', borderRadius: '4px' }} 
            />
            <p style={{ margin: '20px 0 10px 0', fontSize: '1.2em' }}>
              Or use code: <strong style={{ fontSize: '2em', letterSpacing: '4px', display: 'block', marginTop: '10px', color: '#007bff' }}>{uploadResult.code}</strong>
            </p>
            <div style={{ marginTop: '20px' }}>
              <a 
                href={uploadResult.url} 
                target="_blank" 
                rel="noreferrer"
                style={{ display: 'inline-block', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}
              >
                Open on this device
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Retrieve Section */}
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        <h2>Receive File</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Enter code" 
            value={downloadCode} 
            onChange={(e) => setDownloadCode(e.target.value)}
            style={{ padding: '8px', fontSize: '1em', width: '160px', letterSpacing: '2px', textAlign: 'center' }}
            maxLength={8}
          />
          <button onClick={handleRetrieve} style={{ padding: '8px 16px' }}>Download</button>
        </div>
      </div>
    </div>
  )
}

export default App
