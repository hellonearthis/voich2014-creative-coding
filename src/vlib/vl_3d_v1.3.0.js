/*

	The JavaScript classes and functions implemented here are for Voich's personal use
	Ported for the purpose of using, so general-purpose library
	Please use at your own risk as it is not intended to be.
	
	vl_3d_v1.3.0.js
	
	Copyright (c) 2020-2022 Voich (@voich2014 in Twitter)
	
	Released under the MIT license.
 	see https://opensource.org/licenses/MIT
 	Where a citation is listed, please also check the license of the citing source.

 	The source code is licensed MIT.
 	However, the license for content created using this source code is CC BY-NC-SA 4.0.
 	http://creativecommons.org/licenses/by-nc-sa/4.0/

*/

// Self-made libraries 

// 2D Vector Manager
// * Implemented only the bare minimum for now. The rest when needed...
class VectorMan2
{
	// Constructor
	constructor(x = 0,y = 0)
	{
		// Initialize properties
		this.setValue(x,y);
	}
	
	// Bulk set values
	setValue(x,y)
	{
		this.x = x;
		this.y = y;
	}
	
	// Copy
	copy(v2)
	{
		this.x = v2.x;
		this.y = v2.y;
	}
	
	// Convert to unit vector
	normalize()
	{
		// Unit vector is a vector with length 1
		// So, divide each value by length so vector length is 1
		// Make it so that
		const x   = this.x;
		const y   = this.y;
		let len   = Math.sqrt(x*x + y*y);
		
		if(len != 0)
		{
			len = 1.0 / len;
			this.x *= len;
			this.y *= len;
		}
	}
	
	// Invert vector
	invert()
	{
		this.x = -this.x;
		this.y = -this.y;
	}

	// Arithmetic operations between vectors
	add(v2)
	{
		this.x += v2.x;
		this.y += v2.y;
	
		return this;
	}
	
	sub(v2)
	{
		this.x -= v2.x;
		this.y -= v2.y;
	
		return this;
	}
	
	mul(v2)
	{
		this.x *= v2.x;
		this.y *= v2.y;
	
		return this;
	}
	
	div(v2)
	{
		this.x /= v2.x;
		this.y /= v2.y;
	
		return this;
	}
	
	mul_matrix(m3)
	{
		// Column-major multiplication		
		
		//
		// Data sequence in m3 (column-major data order)
		//
		// [0]:m00 [3]:m01 [6]:m02
		// [1]:m10 [4]:m11 [7]:m12
		// [2]:m20 [5]:m21 [8]:m22
		//
		const xx = m3.m[ 0] * this.x + m3.m[ 3] * this.y + m3.m[6];
		const yy = m3.m[ 1] * this.x + m3.m[ 4] * this.y + m3.m[7];
		
		this.x = xx;
		this.y = yy;
		
		return this;
	}
	
	// Return 2D vector in 1D array
	exportSingleArray()
	{
		return [ this.x, this.y ];
	}
}

// 3D Vector Manager
class VectorMan3
{
	// Constructor
	constructor(x = 0,y = 0,z = 0)
	{
		// Initialize properties
		this.setValue(x,y,z);
	}
	
	// Bulk set values
	setValue(x,y,z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	// Copy
	copy(v3)
	{
		this.x = v3.x;
		this.y = v3.y;
		this.z = v3.z;
	}
	
	// Convert to unit vector
	normalize()
	{
		// Unit vector is a vector with length 1
		// So, divide each value by length so vector length is 1
		// Make it so that
		const x   = this.x;
		const y   = this.y;
		const z   = this.z;
		let len   = Math.sqrt(x*x + y*y + z*z);
		
		if(len != 0)
		{
			len = 1.0 / len;
			this.x *= len;
			this.y *= len;
			this.z *= len;
		}
	}
	
	// Calculate dot product
	dotProduct(v)
	{
		// Taking dot product gives angle between vectors
		
		return (this.x * v.x + this.y * v.y + this.z * v.z);
	}

	// Calculate cross product and store
	crossProduct(v1,v2)
	{
		// Cross product is mainly used to find normal vector perpendicular to face

		this.x = v1.y * v2.z - v1.z * v2.y;
		this.y = v1.z * v2.x - v1.x * v2.z;
		this.z = v1.x * v2.y - v1.y * v2.x;
	}

	// Invert vector
	invert()
	{
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
	}

	// Arithmetic operations between vectors
	add(v3)
	{
		this.x += v3.x;
		this.y += v3.y;
		this.z += v3.z;
	
		return this;
	}
	
	sub(v3)
	{
		this.x -= v3.x;
		this.y -= v3.y;
		this.z -= v3.z;
	
		return this;
	}
	
	mul(v3)
	{
		this.x *= v3.x;
		this.y *= v3.y;
		this.z *= v3.z;
	
		return this;
	}
	
	div(v3)
	{
		this.x /= v3.x;
		this.y /= v3.y;
		this.z /= v3.z;
	
		return this;
	}
	
	mul_matrix(m4)
	{
		// Column-major multiplication		
		
		//
		// Data sequence in m4 (column-major data order)
		//
		// [ 0]:m00 [ 4]:m01 [ 8]:m02 [12]:m03
		// [ 1]:m10 [ 5]:m11 [ 9]:m12 [13]:m13
		// [ 2]:m20 [ 6]:m21 [10]:m22 [14]:m23
		// [ 3]:m30 [ 7]:m31 [11]:m32 [15]:m33
		//
		const xx = m4.m[ 0] * this.x + m4.m[ 4] * this.y + m4.m[ 8] * this.z + m4.m[12];
		const yy = m4.m[ 1] * this.x + m4.m[ 5] * this.y + m4.m[ 9] * this.z + m4.m[13];
		const zz = m4.m[ 2] * this.x + m4.m[ 6] * this.y + m4.m[10] * this.z + m4.m[14];
		
		this.x = xx;
		this.y = yy;
		this.z = zz;
		
		return this;
	}
	
	// Return 3D vector in 1D array
	exportSingleArray()
	{
		return [ this.x, this.y, this.z ];
	}
}

// 4D Vector Manager
class VectorMan4
{
	// Constructor
	constructor(x = 0,y = 0,z = 0,w = 1)
	{
		// Initialize properties
		this.setValue(x,y,z,w);
	}
	
	// Bulk set values
	setValue(x,y,z,w)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}
	
	// Copy
	copy(v4)
	{
		this.x = v4.x;
		this.y = v4.y;
		this.z = v4.z;
		this.w = v4.w;
	}
	
	// Convert to unit vector
	normalize()
	{
		// Unit vector is a vector with length 1
		// So, divide each value by length so vector length is 1
		// Make it so that
		const x   = this.x;
		const y   = this.y;
		const z   = this.z;
		const w   = this.w;
		const len = Math.sqrt(x*x + y*y + z*z + w*w);
		
		this.x /= len;
		this.y /= len;
		this.z /= len;
		this.w /= len;
	}
	
	// Arithmetic operations between vectors
	add(v4)
	{
		this.x += v4.x;
		this.y += v4.y;
		this.z += v4.z;
		this.w += v4.w;
	
		return this;
	}
	
	sub(v4)
	{
		this.x -= v4.x;
		this.y -= v4.y;
		this.z -= v4.z;
		this.w -= v4.w;

		return this;
	}
	
	mul(v4)
	{
		this.x *= v4.x;
		this.y *= v4.y;
		this.z *= v4.z;
		this.w *= v4.w;
	
		return this;
	}
	
	div(v4)
	{
		this.x /= v4.x;
		this.y /= v4.y;
		this.z /= v4.z;
		this.w /= v4.w;
	
		return this;
	}
	
	mul_matrix(m4)
	{
		// Multiplication with matrix (In case of column-major, multiply horizontally treating matrix side as row vector)
		//
		// Data sequence in m4 (column-major data order)
		//
		// [ 0]:m00 [ 4]:m01 [ 8]:m02 [12]:m03
		// [ 1]:m10 [ 5]:m11 [ 9]:m12 [13]:m13
		// [ 2]:m20 [ 6]:m21 [10]:m22 [14]:m23
		// [ 3]:m30 [ 7]:m31 [11]:m32 [15]:m33
		//
		const xx = m4.m[ 0] * this.x + m4.m[ 4] * this.y + m4.m[ 8] * this.z + m4.m[12] * this.w;
		const yy = m4.m[ 1] * this.x + m4.m[ 5] * this.y + m4.m[ 9] * this.z + m4.m[13] * this.w;
		const zz = m4.m[ 2] * this.x + m4.m[ 6] * this.y + m4.m[10] * this.z + m4.m[14] * this.w;
		const ww = m4.m[ 3] * this.x + m4.m[ 7] * this.y + m4.m[11] * this.z + m4.m[15] * this.w;

		this.x = xx;
		this.y = yy;
		this.z = zz;
		this.w = ww;
		
		return this;
	}
	
	// Return 4D vector in 1D array
	exportSingleArray()
	{
		return [ this.x, this.y, this.z, this.w ];
	}
}

// 3D Matrix Manager
// * Implemented only the bare minimum for now. The rest when needed...
class MatrixMan3
{
	// Constructor
	constructor()
	{
		// Store in column-major data order
		//
		// [0]:m00 [3]:m01 [6]:m02
		// [1]:m10 [4]:m11 [7]:m12
		// [2]:m20 [5]:m21 [8]:m22
		//
		
		this.m = new Float32Array(9);
		
		// Initialize with identity matrix in advance
		this.initialize();
	}
	
	// Copy
	copy(m3)
	{
		this.m.set(m3.m);
	}

	// Initialize with identity matrix
	initialize()
	{
		// Identity matrix is like this
		//| 1 0 0 |
		//| 0 1 0 |
		//| 0 0 1 |
		
		this.m[0] = 1.0; this.m[3] = 0.0; this.m[6] = 0.0;
		this.m[1] = 0.0; this.m[4] = 1.0; this.m[7] = 0.0;
		this.m[2] = 0.0; this.m[5] = 0.0; this.m[8] = 1.0;
	}

	// Creation of Scale Transformation Matrix
	scale(sx,sy)
	{
		// Scale transformation matrix is like this
		// sx, sy are scaling factors on respective axes
		//| sx  0  0  |
		//|  0 sy  0  |
		//|  0  0  1  |

		this.m[0] = sx;  this.m[3] = 0.0; this.m[6] = 0.0;
		this.m[1] = 0.0; this.m[4] = sy;  this.m[7] = 0.0;
		this.m[2] = 0.0; this.m[5] = 0.0; this.m[8] = 1.0; 
	}
	
	// Creation of X-axis rotation matrix (r is in radians)
	rotateX(r)
	{
		const sinX = Math.sin(r);
		const cosX = Math.cos(r);
		
		// X-axis rotation matrix is like this (column-major arrangement)
		//| 1    0     0 |
		//| 0 cosX -sinX |
		//| 0 sinX  cosX |
		
		this.m[0] = 1.0; this.m[3] =  0.0; this.m[6] =   0.0;
		this.m[1] = 0.0; this.m[4] = cosX; this.m[7] = -sinX;
		this.m[2] = 0.0; this.m[5] = sinX; this.m[8] =  cosX;
	}
	
	// Creation of Y-axis rotation matrix (r is in radians)
	rotateY(r)
	{
		const sinY = Math.sin(r);
		const cosY = Math.cos(r);

		// Y-axis rotation matrix is like this (column-major arrangement)
		//|  cosY   0 sinY |
		//|     0   1    0 |
		//| -sinY   0 cosY |
		
		this.m[0] =  cosY; this.m[3] = 0.0; this.m[6] = sinY;
		this.m[1] =   0.0; this.m[4] = 1.0; this.m[7] =  0.0;
		this.m[2] = -sinY; this.m[5] = 0.0; this.m[8] = cosY;
	}
	
	// Creation of Z-axis rotation matrix (r is in radians)
	rotateZ(r)
	{
		const sinZ = Math.sin(r);
		const cosZ = Math.cos(r);	

		// Z-axis rotation matrix is like this (column-major arrangement)
		//| cosZ -sinZ   0 |
		//| sinZ  cosZ   0 |
		//|    0     0   1 |
		
		this.m[0] = cosZ; this.m[3] = -sinZ; this.m[6] = 0.0;
		this.m[1] = sinZ; this.m[4] =  cosZ; this.m[7] = 0.0;
		this.m[2] =  0.0; this.m[5] =   0.0; this.m[8] = 1.0;
	}
	
	// Creation of Translation Matrix
	translate(tx,ty)
	{
		// Translation matrix is like this (column-major arrangement)
		//|  1  0 tx |
		//|  0  1 ty |
		//|  0  0  1 |
		
		this.m[0] = 1.0; this.m[3] = 0.0; this.m[6] = tx;
		this.m[1] = 0.0; this.m[4] = 1.0; this.m[7] = ty;
		this.m[2] = 0.0; this.m[5] = 0.0; this.m[8] = 1.0;
	}

	// Addition between matrices
	add(m3)
	{
		this.m[0] += m3.m[0];
		this.m[1] += m3.m[1];
		this.m[2] += m3.m[2];
		
		this.m[3] += m3.m[3];
		this.m[4] += m3.m[4];
		this.m[5] += m3.m[5];

		this.m[6] += m3.m[6];
		this.m[7] += m3.m[7];
		this.m[8] += m3.m[8];

		return this;
	}
	
	// Subtraction between matrices
	sub(m3)
	{
		this.m[0] -= m3.m[0];
		this.m[1] -= m3.m[1];
		this.m[2] -= m3.m[2];
		
		this.m[3] -= m3.m[3];
		this.m[4] -= m3.m[4];
		this.m[5] -= m3.m[5];

		this.m[6] -= m3.m[6];
		this.m[7] -= m3.m[7];
		this.m[8] -= m3.m[8];

		return this;
	}
	
	// Multiplication between matrices
	mul(m3)
	{
		const _00 = this.m[0] * m3.m[0] + this.m[1] * m3.m[3] + this.m[2] * m3.m[6];
		const _01 = this.m[0] * m3.m[1] + this.m[1] * m3.m[4] + this.m[2] * m3.m[7];
		const _02 = this.m[0] * m3.m[2] + this.m[1] * m3.m[5] + this.m[2] * m3.m[8];

		const _10 = this.m[3] * m3.m[0] + this.m[4] * m3.m[3] + this.m[5] * m3.m[6];
		const _11 = this.m[3] * m3.m[1] + this.m[4] * m3.m[4] + this.m[5] * m3.m[7];
		const _12 = this.m[3] * m3.m[2] + this.m[4] * m3.m[5] + this.m[5] * m3.m[8];
			
		const _20 = this.m[6] * m3.m[0] + this.m[7] * m3.m[3] + this.m[8] * m3.m[6];
		const _21 = this.m[6] * m3.m[1] + this.m[7] * m3.m[4] + this.m[8] * m3.m[7];
		const _22 = this.m[6] * m3.m[2] + this.m[7] * m3.m[5] + this.m[8] * m3.m[8];
			
		this.m[0] = _00; this.m[1] = _01; this.m[2] = _02;
		this.m[3] = _10; this.m[4] = _11; this.m[5] = _12;
		this.m[6] = _20; this.m[7] = _21; this.m[8] = _22;
		
		return this;
	}
}

// 4D Matrix Manager
class MatrixMan4
{
	// Constructor
	constructor()
	{
		// Store in column-major data order
		//
		// [ 0]:m00 [ 4]:m01 [ 8]:m02 [12]:m03
		// [ 1]:m10 [ 5]:m11 [ 9]:m12 [13]:m13
		// [ 2]:m20 [ 6]:m21 [10]:m22 [14]:m23
		// [ 3]:m30 [ 7]:m31 [11]:m32 [15]:m33
		//
		
		this.m = new Float32Array(16);
		
		// Initialize with identity matrix in advance
		this.initialize();
	}
	
	// Copy
	copy(m4)
	{
		this.m.set(m4.m);
	}

	// Initialize with identity matrix
	initialize()
	{
		// Identity matrix is like this
		//| 1 0 0 0 |
		//| 0 1 0 0 |
		//| 0 0 1 0 |
		//| 0 0 0 1 |
		
		this.m[ 0] = 1.0; this.m[ 4] = 0.0; this.m[ 8] = 0.0; this.m[12] = 0.0;
		this.m[ 1] = 0.0; this.m[ 5] = 1.0; this.m[ 9] = 0.0; this.m[13] = 0.0;
		this.m[ 2] = 0.0; this.m[ 6] = 0.0; this.m[10] = 1.0; this.m[14] = 0.0;
		this.m[ 3] = 0.0; this.m[ 7] = 0.0; this.m[11] = 0.0; this.m[15] = 1.0;
	}

	// Creation of Scale Transformation Matrix
	scale(sx,sy,sz)
	{
		// Scale transformation matrix is like this
		// sx, sy, sz are scaling factors on respective axes
		//| sx  0  0  0 |
		//|  0 sy  0  0 |
		//|  0  0 sz  0 | 
		//|  0  0  0  1 |

		this.m[ 0] = sx;  this.m[ 4] = 0.0; this.m[ 8] = 0.0; this.m[12] = 0.0;
		this.m[ 1] = 0.0; this.m[ 5] = sy;  this.m[ 9] = 0.0; this.m[13] = 0.0;
		this.m[ 2] = 0.0; this.m[ 6] = 0.0; this.m[10] = sz;  this.m[14] = 0.0;
		this.m[ 3] = 0.0; this.m[ 7] = 0.0; this.m[11] = 0.0; this.m[15] = 1.0;
	}
	
	// Creation of X-axis rotation matrix (r is in radians)
	rotateX(r)
	{
		const sinX = Math.sin(r);
		const cosX = Math.cos(r);
		
		// X-axis rotation matrix is like this (column-major arrangement)
		//| 1    0     0    0 |
		//| 0 cosX -sinX    0 |
		//| 0 sinX  cosX    0 |
		//| 0    0     0    1 |	
		
		this.m[ 0] = 1.0; this.m[ 4] =  0.0; this.m[ 8] =   0.0; this.m[12] = 0.0;
		this.m[ 1] = 0.0; this.m[ 5] = cosX; this.m[ 9] = -sinX; this.m[13] = 0.0;
		this.m[ 2] = 0.0; this.m[ 6] = sinX; this.m[10] =  cosX; this.m[14] = 0.0;
		this.m[ 3] = 0.0; this.m[ 7] =  0.0; this.m[11] =   0.0; this.m[15] = 1.0;
	}
	
	// Creation of Y-axis rotation matrix (r is in radians)
	rotateY(r)
	{
		const sinY = Math.sin(r);
		const cosY = Math.cos(r);

		// Y-axis rotation matrix is like this (column-major arrangement)
		//|  cosY   0 sinY    0 |
		//|     0   1    0    0 |
		//| -sinY   0 cosY    0 |
		//|     0   0    0    1 |
		
		this.m[ 0] =  cosY; this.m[ 4] = 0.0; this.m[ 8] = sinY; this.m[12] = 0.0;
		this.m[ 1] =   0.0; this.m[ 5] = 1.0; this.m[ 9] =  0.0; this.m[13] = 0.0;
		this.m[ 2] = -sinY; this.m[ 6] = 0.0; this.m[10] = cosY; this.m[14] = 0.0;
		this.m[ 3] =   0.0; this.m[ 7] = 0.0; this.m[11] =  0.0; this.m[15] = 1.0;
	}
	
	// Creation of Z-axis rotation matrix (r is in radians)
	rotateZ(r)
	{
		const sinZ = Math.sin(r);
		const cosZ = Math.cos(r);	

		// Z-axis rotation matrix is like this (column-major arrangement)
		//| cosZ -sinZ   0   0 |
		//| sinZ  cosZ   0   0 |
		//|    0     0   1   0 |
		//|    0     0   0   1 |	
		
		this.m[ 0] = cosZ; this.m[ 4] = -sinZ; this.m[ 8] = 0.0; this.m[12] = 0.0;
		this.m[ 1] = sinZ; this.m[ 5] =  cosZ; this.m[ 9] = 0.0; this.m[13] = 0.0;
		this.m[ 2] =  0.0; this.m[ 6] =   0.0; this.m[10] = 1.0; this.m[14] = 0.0;
		this.m[ 3] =  0.0; this.m[ 7] =   0.0; this.m[11] = 0.0; this.m[15] = 1.0;
	}
	
	// Creation of Translation Matrix
	translate(tx,ty,tz)
	{
		// Translation matrix is like this (column-major arrangement)
		//|  1  0  0 tx |
		//|  0  1  0 ty |
		//|  0  0  1 tz |
		//|  0  0  0  1 |
		
		this.m[ 0] = 1.0; this.m[ 4] = 0.0; this.m[ 8] =  0.0; this.m[12] =  tx;
		this.m[ 1] = 0.0; this.m[ 5] = 1.0; this.m[ 9] =  0.0; this.m[13] =  ty;
		this.m[ 2] = 0.0; this.m[ 6] = 0.0; this.m[10] =  1.0; this.m[14] =  tz;
		this.m[ 3] = 0.0; this.m[ 7] = 0.0; this.m[11] =  0.0; this.m[15] = 1.0;
	}
	
	// Create View Transformation Matrix
	view(v3from,v3to,v3up)
	{
		// Matrix to transform object to position seen from camera
	
		// v3from	Camera (Viewpoint) Position
		// v3to		Gaze Point
		// v3up		Camera Up Direction
		let vecX = new VectorMan3();	// X-axis vector
		let vecY = new VectorMan3();	// Y-axis vector
		let vecZ = new VectorMan3();	// Z-axis vector

		// Get Z direction vector indicating depth.
	    // The difference from viewpoint to gaze point. This is
	    // Direction to gaze (usually -Z).
	    
		// Calculate vector from camera (viewpoint) to gaze point
		vecZ.copy(v3from);		// of vecZ = v3from - v3to
		vecZ.sub(v3to)	;		// Vector calculation (for right-handed coordinate system)
		
		vecZ.normalize();		// Normalization

		// Direction to gaze (Z direction vector) and up vector representing camera's up direction
		// Calculate orthogonal X direction vector (usually +X) from the cross product of, and further X direction
		// By cross product of vector and Z direction vector, Y direction orthogonal to X-Z plane
		// Derive vector (usually +Y).
	    
		vecX.crossProduct(v3up,vecZ);	// Cross product
		vecX.normalize();				// Normalization
		vecY.crossProduct(vecZ,vecX);	// Cross product
		vecY.normalize();				// Normalization
		
		// Start constructing matrix. In the first 3 rows,
	    // Includes vector to rotate view to face gaze point.
	    // point.
		// The 4th row contains translation values (dot product of direction vectors and from)
		// is included. 
	    // Rotation centered on viewpoint is performed. (Column-major arrangement)
	    //
	    //   Rotation         Rotation          Rotation      Translation
		//| vecX.x       vecX.y        vecX.z  -(vecX・from) |
		//| vecY.x       vecY.y        vecY.z  -(vecY・from) |
		//| vecZ.x       vecZ.y        vecZ.z  -(vecZ・from) |
		//|    0            0             0           1      |

		// Apply to matrix
		this.m[ 0] = vecX.x; this.m[ 4] = vecX.y; this.m[ 8] = vecX.z; this.m[12] = -(v3from.dotProduct(vecX));
		this.m[ 1] = vecY.x; this.m[ 5] = vecY.y; this.m[ 9] = vecY.z; this.m[13] = -(v3from.dotProduct(vecY));
		this.m[ 2] = vecZ.x; this.m[ 6] = vecZ.y; this.m[10] = vecZ.z; this.m[14] = -(v3from.dotProduct(vecZ));
		this.m[ 3] = 0.0;    this.m[ 7] = 0.0;    this.m[11] = 0.0;    this.m[15] =  1.0;
	}
	
	// Create Projection Matrix (OpenGL compliant version)
	projectionOpenGL(nearZ,farZ,fov,aspect)
	{
		// Create OpenGL compliant projection matrix
		//
		// Referencing the one for column-major (for OpenGL) on the following site.
		// https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix/opengl-perspective-projection-matrix
		// 
		
		// For column-major
		// 
		// |   2*n/(r-l)      0         (r+l)/(r-l)         0       |
		// |      0        2*n/(t-b)    (t+b)/(t-b)         0       |
		// |      0           0        -(f+n)/(f-n)  -(2*f*n)/(f-n) |
		// |      0           0             -1              0       |
		
		// nearZ		Distance from viewpoint to screen (Set a positive value)
		// farZ		Distance from viewpoint to limit of field of view (Set a positive value)
		// fov		Field of view (in radians)
		// aspect	Width-based aspect ratio (W/H)
		
		// Space of right-handed coordinate system
		//
		//       +Y
		//        |<-near->+ top
		//        |      ／| 
		//        |    ／  | 
		//        |  ／    | scale
		//        |／)fov/2|
		// +Z-----+--------+-----------
		//        |＼)     |
		//        |  ＼    |
		//        |    ＼  |
		//        |      ＼|
		//        |        +bottom
		//
		
		const n     = nearZ;
		const f     = farZ;
		const scale = Math.tan(fov * 0.5) * n;
		const r     = aspect * scale;
		const l     = -r;
		const t     = scale;
		const b     = -t;
		
		this.initialize();
		
		this.m[ 0] = 2 * n / (r - l);
		this.m[ 5] = 2 * n / (t - b);
		this.m[ 8] = (r + l) / (r - l); // Effectively 0
		this.m[ 9] = (t + b) / (t - b); // Effectively 0
		this.m[10] = -(f + n) / (f - n);
		this.m[11] = -1.0;
		this.m[14] = -(2 * f * n) / (f - n);
		this.m[15] = 0.0;
		
		//
		// By applying this transformation,
		//
		// X = (Left)   -1.0 to 1.0 (Right)
		// Y = (Bottom)   -1.0 to 1.0 (Top)
		// Z = (nearZ)-1.0 ～ 1.0(farZ)
		//
		// It is converted to clipping space within the frustum range.
		// X and Y are mapped to the screen area drawing -1.0 to 1.0
		// ViewPort transformation is possible by doing.
		// After projection transformation, space of left-handed coordinate system where front is Z=-1 and back is +1
		// Please note that it is.
		//
	}

	// Create Viewport Matrix
	viewPort(x,y,width,height)
	{
		// This matrix follows viewport dimensions and specified depth range
		// Scale vertices and render them to target
		// Translate to appropriate position coordinates of surface. Also, this matrix
		// To reflect screen origin at top left where y increases downwards 
		// Invert y coordinate. Even after applying this matrix, vertices are homogeneous.
		// In other words, since vertex still exists as [x,y,z,w] vertex,
		// Must transform vertices non-homogeneously before sending to rasterizer
		// must be.
		// (Excerpt from DirectX 8.0 Japanese Help)

		// Column-major arrangement
		//
		//  X coordinate Scaling  Y coordinate Scaling  Z is     Origin to center of screen
		//                  & Vertical flip   As is       Translation
		//| Width / 2       0               0           Width  / 2 + X |
		//| 0               -Height / 2     0           Height / 2 + Y |
   		//| 0               0               1           0              |
		//| 1	            1               0           1              |
		
		this.initialize();
		
		this.m[ 0] =  width  / 2.0;
		this.m[ 5] = -height / 2.0;
		this.m[12] = width   / 2.0 + x;
		this.m[13] = height  / 2.0 + y;
	}

	// Addition between matrices
	add(m4)
	{
		this.m[ 0] += m4.m[ 0];
		this.m[ 1] += m4.m[ 1];
		this.m[ 2] += m4.m[ 2];
		this.m[ 3] += m4.m[ 3];
		
		this.m[ 4] += m4.m[ 4];
		this.m[ 5] += m4.m[ 5];
		this.m[ 6] += m4.m[ 6];
		this.m[ 7] += m4.m[ 7];

		this.m[ 8] += m4.m[ 8];
		this.m[ 9] += m4.m[ 9];
		this.m[10] += m4.m[10];
		this.m[11] += m4.m[11];

		this.m[12] += m4.m[12];
		this.m[13] += m4.m[13];
		this.m[14] += m4.m[14];
		this.m[15] += m4.m[15];

		return this;
	}
	
	// Subtraction between matrices
	sub(m4)
	{
		this.m[ 0] -= m4.m[ 0];
		this.m[ 1] -= m4.m[ 1];
		this.m[ 2] -= m4.m[ 2];
		this.m[ 3] -= m4.m[ 3];
		
		this.m[ 4] -= m4.m[ 4];
		this.m[ 5] -= m4.m[ 5];
		this.m[ 6] -= m4.m[ 6];
		this.m[ 7] -= m4.m[ 7];

		this.m[ 8] -= m4.m[ 8];
		this.m[ 9] -= m4.m[ 9];
		this.m[10] -= m4.m[10];
		this.m[11] -= m4.m[11];

		this.m[12] -= m4.m[12];
		this.m[13] -= m4.m[13];
		this.m[14] -= m4.m[14];
		this.m[15] -= m4.m[15];

		return this;
	}
	
	// Multiplication between matrices
	mul(m4)
	{
		const _00 = this.m[ 0] * m4.m[ 0] + this.m[ 1] * m4.m[ 4] + this.m[ 2] * m4.m[ 8] + this.m[ 3] * m4.m[12];
		const _01 = this.m[ 0] * m4.m[ 1] + this.m[ 1] * m4.m[ 5] + this.m[ 2] * m4.m[ 9] + this.m[ 3] * m4.m[13];
		const _02 = this.m[ 0] * m4.m[ 2] + this.m[ 1] * m4.m[ 6] + this.m[ 2] * m4.m[10] + this.m[ 3] * m4.m[14];
		const _03 = this.m[ 0] * m4.m[ 3] + this.m[ 1] * m4.m[ 7] + this.m[ 2] * m4.m[11] + this.m[ 3] * m4.m[15];

		const _10 = this.m[ 4] * m4.m[ 0] + this.m[ 5] * m4.m[ 4] + this.m[ 6] * m4.m[ 8] + this.m[ 7] * m4.m[12];
		const _11 = this.m[ 4] * m4.m[ 1] + this.m[ 5] * m4.m[ 5] + this.m[ 6] * m4.m[ 9] + this.m[ 7] * m4.m[13];
		const _12 = this.m[ 4] * m4.m[ 2] + this.m[ 5] * m4.m[ 6] + this.m[ 6] * m4.m[10] + this.m[ 7] * m4.m[14];
		const _13 = this.m[ 4] * m4.m[ 3] + this.m[ 5] * m4.m[ 7] + this.m[ 6] * m4.m[11] + this.m[ 7] * m4.m[15];
			
		const _20 = this.m[ 8] * m4.m[ 0] + this.m[ 9] * m4.m[ 4] + this.m[10] * m4.m[ 8] + this.m[11] * m4.m[12];
		const _21 = this.m[ 8] * m4.m[ 1] + this.m[ 9] * m4.m[ 5] + this.m[10] * m4.m[ 9] + this.m[11] * m4.m[13];
		const _22 = this.m[ 8] * m4.m[ 2] + this.m[ 9] * m4.m[ 6] + this.m[10] * m4.m[10] + this.m[11] * m4.m[14];
		const _23 = this.m[ 8] * m4.m[ 3] + this.m[ 9] * m4.m[ 7] + this.m[10] * m4.m[11] + this.m[11] * m4.m[15];
			
		const _30 = this.m[12] * m4.m[ 0] + this.m[13] * m4.m[ 4] + this.m[14] * m4.m[ 8] + this.m[15] * m4.m[12];
		const _31 = this.m[12] * m4.m[ 1] + this.m[13] * m4.m[ 5] + this.m[14] * m4.m[ 9] + this.m[15] * m4.m[13];
		const _32 = this.m[12] * m4.m[ 2] + this.m[13] * m4.m[ 6] + this.m[14] * m4.m[10] + this.m[15] * m4.m[14];
		const _33 = this.m[12] * m4.m[ 3] + this.m[13] * m4.m[ 7] + this.m[14] * m4.m[11] + this.m[15] * m4.m[15];
			
		this.m[ 0] = _00; this.m[ 1] = _01; this.m[ 2] = _02; this.m[ 3] = _03;
		this.m[ 4] = _10; this.m[ 5] = _11; this.m[ 6] = _12; this.m[ 7] = _13;
		this.m[ 8] = _20; this.m[ 9] = _21; this.m[10] = _22; this.m[11] = _23;
		this.m[12] = _30; this.m[13] = _31; this.m[14] = _32; this.m[15] = _33;
		
		return this;
	}
}

// Vertex Information Manager
class VertexMan
{
	// Constructor
	constructor()
	{
		this.vv     = new VectorMan4();		// Vertex coordinates (Made 4D for convenience during later coordinate transformation)
		this.vn     = new VectorMan3();		// Vertex normal vector
		// this.R      = 0;					// Vertex Color (R)
		// this.G      = 0;					// Vertex Color (G)
		// this.B      = 0;					// Vertex Color (B)
	}

	// Copy
	copy(vtx)
	{
		this.vv.copy(vtx.vv);
		this.vn.copy(vtx.vn);
		//this.R      = vtx.R;
		//this.G      = vtx.G;
		//this.B      = vtx.B;
	}
	
}

// Quaternion Manager
class QuaternionMan
{
	// Constructor
	constructor(x = 0,y = 0,z = 0,w = 0)
	{
		// Initialize properties
		this.setValue(x,y,z,w);
	}
	
	// Bulk set values
	setValue(x,y,z,w)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}
	
	// Copy
	copy(q)
	{
		this.x = q.x;
		this.y = q.y;
		this.z = q.z;
		this.w = q.w;
	}
	
	// Calculate quaternion facing target direction
	createQuat(obj_posv,obj_nv,target_posv)
	{
		//
		// obj_posv    ... Object's center position
		// obj_nv      ... Object's normal vector (facing direction)
		// target_posv ... Position to face
	    //
	    
	    // Calculate vector (normalized) of direction to face
	    let dirx = target_posv.x - obj_posv.x;
	    let diry = target_posv.y - obj_posv.y;
	    let dirz = target_posv.z - obj_posv.z;
	    let dirl = Math.sqrt(dirx*dirx + diry*diry + dirz*dirz);
	    if(dirl != 0)
	    {
	    	dirl = 1.0 / dirl;
			dirx *= dirl;
			diry *= dirl;
			dirz *= dirl;
		}
	    
	    // Calculate cross product with object normal,
	    // Calculate rotation axis vector (normalized)
	    // Calculate cross product and use as rotation axis vector
	    let rotx = obj_nv.y * dirz - obj_nv.z * diry;
	    let roty = obj_nv.z * dirx - obj_nv.x * dirz;
	    let rotz = obj_nv.x * diry - obj_nv.y * dirx;
	    let rotl = Math.sqrt(rotx*rotx + roty*roty + rotz*rotz);
	    if(rotl != 0)
	    {
	    	rotl = 1.0 / rotl;
			rotx *= rotl;
			roty *= rotl;
			rotz *= rotl;
		}
		
	    // Use angle obtained from dot product as rotation angle
	    const r = Math.acos(obj_nv.x * dirx + obj_nv.y * diry + obj_nv.z * dirz);
	    
	    // Calculate quaternion x, y, z, w
	    //
	    // rv = Rotation axis vector
		// θ = Rotation angle
		// x  = rv.x * sin(θ/2)
		// y  = rv.y * sin(θ/2)
		// z  = rv.z * sin(θ/2)
		// w  = cos(θ/2)
		//
		const s2 = Math.sin(r/2);
		this.x = rotx * s2;
		this.y = roty * s2;
		this.z = rotz * s2;
		this.w = Math.cos(r/2);
	}
	
	// Convert to rotation matrix
	convertMatrix(mat4)
	{
		// Create rotation matrix from quaternion
		//
		// Reference (This site uses row-major matrix)
		// http://marupeke296.com/DXG_No58_RotQuaternionTrans.html
		//
		// Convert 4 elements of quaternion x,y,z,w to rotation matrix
		//
		// | 1-2y^2-2z^2     2xy-2wz      2xz+2wy         0       |
		// |    2xy+2wz   1-2x^2-2z^2     2yz-2wx         0       |
		// |    2xz-2wy      2yz+2wx   1-2x^2-2y^2        0       |
		// |       0            0            0            1       |
		//
		const x2 = 2.0 * this.x * this.x;	//2x^2
		const y2 = 2.0 * this.y * this.y;	//2y^2
		const z2 = 2.0 * this.z * this.z;	//2z^2
		const xy = 2.0 * this.x * this.y;	//2xy
		const xz = 2.0 * this.x * this.z;	//2xz
		const yz = 2.0 * this.y * this.z;	//2yz
		const wx = 2.0 * this.w * this.x;	//2wx
		const wy = 2.0 * this.w * this.y;	//2wy
		const wz = 2.0 * this.w * this.z;	//2wz
		
		mat4.m[ 0] = 1.0 - y2 - z2;		//m00
		mat4.m[ 1] = xy + wz;			//m10
		mat4.m[ 2] = xz - wy;			//m20
		mat4.m[ 3] = 0.0;				//m30
		
		mat4.m[ 4] = xy - wz;			//m01
		mat4.m[ 5] = 1.0 - x2 - z2;		//m11
		mat4.m[ 6] = yz + wx;			//m21
		mat4.m[ 7] = 0.0;				//m31
		
		mat4.m[ 8] = xz + wy;			//m02
		mat4.m[ 9] = yz - wx;			//m12
		mat4.m[10] = 1.0 - x2 - y2;		//m22
		mat4.m[11] = 0.0;				//m32

		mat4.m[12] = 0.0;				//m03
		mat4.m[13] = 0.0;				//m13
		mat4.m[14] = 0.0;				//m23
		mat4.m[15] = 1.0;				//m33
	}
}

const DEF_VERTEX_NUM_FOR_PRIMITIVE = 3;		// Default number of vertices per primitive
											// (Default is 3 since it's a triangle polygon)
const DEF_TORUS_NUM                = 10;	// Default division count for torus object
const DEF_CYLINDER_NUM             = 10;	// Default division count for cylinder object
const DEF_PYRAMID_NUM              = 4;	    // Default division count for pyramid (n-gonal pyramid) object
const DEF_SPHERE_NUM               = 4;	    // Default division count for sphere object
const DEF_CIRCLE_NUM               = 10;	// Default division count for n-gon circle object

// Base part of 3D Object Manager
class Obj3dManBase
{
	// Constructor
	constructor()
	{
		this.vertexList            = [];	// Vertex data list
		this.polyIndexList         = [];	// Index list of vertices forming polygons
		this.vertexNum             = 0;		// Number of vertices
		this.vertexNumForPrimitive
		 = DEF_VERTEX_NUM_FOR_PRIMITIVE;	// Number of vertices per primitive (Usually 3 = Triangle Polygon)
		this.primitiveNum          = 0;		// Number of primitives
	}
}

// XY Plane Object Manager
class SquareXYObjMan extends Obj3dManBase
{
	// Constructor
	constructor()
	{
		// Initialization
		super();
		
		// Generate Vertex List
		this.create();
	}

	// Generate object vertex list
	create()
	{
		// Secure data area
		const totalVertex    = 4;								// Number of vertices
		const totalPolygon   = 2;								// Number of polygons
		const totalPolyIndex = totalPolygon *					// Vertex Index
							   this.vertexNumForPrimitive;		// Total amount of info
		this.vertexList = [];
		for(let i = 0;i < totalVertex;++i)
		{
			this.vertexList.push(new VertexMan());
		}
		this.polyIndexList = new Int16Array(totalPolyIndex);
		this.vertexNum     = totalVertex;
		this.primitiveNum  = totalPolygon;

		// The vertices of the XY plane are 4 points in the following order
		//
		// 0----2 
		// |    |
	    // |    |
		// 1----3
		//
		// Assuming length of each side is 1.0 appropriately for now
		// Use enlarged
		// With the center of this plane as the origin (x,y)=(0,0)
		// Specify coordinates of each vertex.
		// X axis is minus on the left side, Y axis is minus on the bottom side.
		// Since this plane is the XY plane, all Z coordinates are treated as 0.
		//
		this.vertexList[0].vv.x = -0.5; this.vertexList[0].vv.y =  0.5; this.vertexList[0].vv.z = 0.0;
		this.vertexList[1].vv.x = -0.5; this.vertexList[1].vv.y = -0.5; this.vertexList[1].vv.z = 0.0;
		this.vertexList[2].vv.x =  0.5; this.vertexList[2].vv.y =  0.5; this.vertexList[2].vv.z = 0.0;
		this.vertexList[3].vv.x =  0.5; this.vertexList[3].vv.y = -0.5; this.vertexList[3].vv.z = 0.0;
		
		// Create drawing order index of each vertex for polygon drawing
		//
		// The direction of the polygon surface is counter-clockwise (left rotation) to match OpenGL system
		// Assumed to be front.
		// Surface direction is represented by normal vector direction, and normal vector is of vertices A,B,C
		// Calculate with the cross product of AB vector and AC vector.
		//
		// A----C 
		// |  ／|
	    // |／  |
		// B----D
		// 
		// Cross product result of vectors is obtained as a vector, calculated by the following formula.
		//
		// <Case of finding n vector which becomes normal vector with vertices A, B, C as v0, v1, v2>
		//
		// va = v1 - v0
		// vb = v2 - v0
		// 
		// n   = va×vb
		// n.x = va.y * vb.z - va.z * vb.y;
		// n.y = va.z * vb.x - va.x * vb.z;
		// n.z = va.x * vb.y - va.y * vb.x;
		//
		// Try applying coordinate values
		// va.x = -0.5 - -0.5 =  0.0
		// va.y = -0.5 -  0.5 = -1.0
		// va.z =  0.0 -  0.0 =  0.0
		// vb.x =  0.5 - -0.5 =  1.0
		// vb.y =  0.5 -  0.5 =  0.0
		// vb.z =  0.0 -  0.0 =  0.0
		//
		// n.x = -1.0 *  0.0 -  0.0 *  0.0 = 0.0 -  0.0 = 0.0
		// n.y =  0.0 *  1.0 -  0.0 *  0.0 = 0.0 -  0.0 = 0.0
		// n.z =  0.0 *  0.0 - -1.0 *  1.0 = 0.0 - -1.0 = 1.0
		//
		// +Z normal vector which is perpendicular to XY plane and parallel to Z axis was calculated.
		// In the right-handed coordinate system, front (direction facing the camera) is +Z, so triangle
		// The polygon ABC will be facing front.
		//
		// In case of clockwise (right rotation) triangle ACB
		// va.x =  0.5 - -0.5 =  1.0
		// va.y =  0.5 -  0.5 =  0.0
		// va.z =  0.0 -  0.0 =  0.0
		// vb.x = -0.5 - -0.5 =  0.0
		// vb.y = -0.5 -  0.5 = -1.0
		// vb.z =  0.0 -  0.0 =  0.0
		//
		// n.x =  0.0 *  0.0 -  0.0 * -1.0 =  0.0 -  0.0 =  0.0
		// n.y =  0.0 *  0.0 -  1.0 *  0.0 =  0.0 -  0.0 =  0.0
		// n.z =  1.0 * -1.0 -  0.0 *  0.0 = -1.0 -  0.0 = -1.0
		// 
		// In case of clockwise vertex order, becomes -Z, meaning facing the other side
		// and it is treated as the back side.
		//
		// Polygons facing front constituting a quadrangle are triangle ABC and triangle CBD.
		//
		const drawIndexList = 
		[
			0,1,2, 2,1,3
		];
		for(let i = 0;i < totalPolyIndex;++i)
		{
			this.polyIndexList[i] = drawIndexList[i];
		}
		
		// Generate array to pour into vertex buffer in advance
		this.polyVertexList = new Float32Array(totalVertex * 4);
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
		
		// Create UV coordinate list for border drawing corresponding to vertex index
		//
		// -1,1  1,1
		//   0----2 
		//   |  ／|
	    //   |／  |
		//   1----3
		// -1,-1 1,-1
		//
		const uvList = 
		[
			{ u: -1, v:  1 },
			{ u: -1, v: -1 },
			{ u:  1, v:  1 },
			{ u:  1, v: -1 }
		];
		this.polyUVList = [];
		for(let i = 0;i < totalPolyIndex;i += 6)
		{
			this.polyUVList.push(uvList[0]);
			this.polyUVList.push(uvList[1]);
			this.polyUVList.push(uvList[2]);
			
			this.polyUVList.push(uvList[2]);
			this.polyUVList.push(uvList[1]);
			this.polyUVList.push(uvList[3]);
		}
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		this.action_right_uv(0);
		
	}
	
	action_right_uv(t)
	{
		// Input t = 0.0 - 1.0 to get texture UV coordinate u
		// Change
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		//
		//  0,1  1,1
		//   0----2 
		//   |  ／| 
	    //   |／  | 
		//   1----3 
		//  0,0  1,0
		//
		// Texture UV coordinates are set to bottom-left origin to match OpenGL.
		// To make cube side and top/bottom surfaces different images, horizontally long
		// Prepare textures and divide allocation.
		//
		const texUvList = 
		[
			{ u:  1.0-t, v:  1.0 },{ u:  1.0-t, v:  0.0 },
			{ u:  2.0-t, v:  1.0 },{ u:  2.0-t, v:  0.0 }
		];
		this.polyTexUVList = [];
		for(let i = 0;i < this.vertexNumForPrimitive * 2;i += 6)
		{
			this.polyTexUVList.push(texUvList[0]);
			this.polyTexUVList.push(texUvList[1]);
			this.polyTexUVList.push(texUvList[2]);
			
			this.polyTexUVList.push(texUvList[2]);
			this.polyTexUVList.push(texUvList[1]);
			this.polyTexUVList.push(texUvList[3]);
		}	
	}
}

// XZ Plane Object Manager
class SquareXZObjMan extends Obj3dManBase
{
	// Constructor
	constructor()
	{
		// Initialization
		super();
		
		// Generate Vertex List
		this.create();
	}

	// Generate object vertex list
	create()
	{
		// Secure data area
		const totalVertex    = 4;								// Number of vertices
		const totalPolygon   = 2;								// Number of polygons
		const totalPolyIndex = totalPolygon *					// Vertex Index
							   this.vertexNumForPrimitive;		// Total amount of info
		this.vertexList = [];
		for(let i = 0;i < totalVertex;++i)
		{
			this.vertexList.push(new VertexMan());
		}
		this.polyIndexList = new Int16Array(totalPolyIndex);
		this.vertexNum     = totalVertex;
		this.primitiveNum  = totalPolygon;

		// The vertices of the XZ plane are 4 points in the following order
		//
		// 0-----2 
		// |     |
	    // |     |
		// 1-----3
		//
		// Assuming length of each side is 1.0 appropriately for now
		// Use enlarged
		// With the center of this plane as the origin (x,z)=(0,0)
		// Specify coordinates of each vertex.
		// X axis is minus on the left side, Z axis is minus on the back side.
		// Since this plane is the XZ plane, all Y coordinates are treated as 0.
		//
		this.vertexList[0].vv.x = -0.5; this.vertexList[0].vv.y = 0.0; this.vertexList[0].vv.z = -0.5;
		this.vertexList[1].vv.x = -0.5; this.vertexList[1].vv.y = 0.0; this.vertexList[1].vv.z =  0.5;
		this.vertexList[2].vv.x =  0.5; this.vertexList[2].vv.y = 0.0; this.vertexList[2].vv.z = -0.5;
		this.vertexList[3].vv.x =  0.5; this.vertexList[3].vv.y = 0.0; this.vertexList[3].vv.z =  0.5;
		
		// Create drawing order index of each vertex for polygon drawing
		//
		// The direction of the polygon surface is counter-clockwise (left rotation) to match OpenGL system
		// Assumed to be front.
		// Surface direction is represented by normal vector direction, and normal vector is of vertices A,B,C
		// Calculate with the cross product of AB vector and AC vector.
		//
		// A----C 
		// |  ／|
	    // |／  |
		// B----D
		//
		// On the XZ plane, calculate the normal vector pointing upward (+Y)
		// To calculate with cross product, vertex drawing order is ABC and CBD.
		//
		const drawIndexList = 
		[
			0,1,2, 2,1,3
		];
		for(let i = 0;i < totalPolyIndex;++i)
		{
			this.polyIndexList[i] = drawIndexList[i];
		}
		
		// Generate array to pour into vertex buffer in advance
		this.polyVertexList = new Float32Array(totalVertex * 4);
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
		
		// Create UV coordinate list for border drawing corresponding to vertex index
		//
		// -1,1  1,1
		//   0----2 
		//   |  ／|
	    //   |／  |
		//   1----3
		// -1,-1 1,-1
		//
		const uvList = 
		[
			{ u: -1, v:  1 },
			{ u: -1, v: -1 },
			{ u:  1, v:  1 },
			{ u:  1, v: -1 }
		];
		this.polyUVList = [];
		for(let i = 0;i < totalPolyIndex;i += 6)
		{
			this.polyUVList.push(uvList[0]);
			this.polyUVList.push(uvList[1]);
			this.polyUVList.push(uvList[2]);
			
			this.polyUVList.push(uvList[2]);
			this.polyUVList.push(uvList[1]);
			this.polyUVList.push(uvList[3]);
		}
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		this.action_down_uv(0);
		
	}
	
	action_down_uv(t)
	{
		// Input t = 0.0 - 1.0 to get texture UV coordinate v
		// Change
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		//
		//  0,1  1,1
		//   0----2 
		//   |  ／| 
	    //   |／  | 
		//   1----3 
		//  0,0  1,0
		//
		// Texture UV coordinates are set to bottom-left origin to match OpenGL.
		// To make cube side and top/bottom surfaces different images, horizontally long
		// Prepare textures and divide allocation.
		//
		const texUvList = 
		[
			{ u:  0, v:  2.0-t },{ u:  0, v:  1.0-t },
			{ u:  1, v:  2.0-t },{ u:  1, v:  1.0-t }
		];
		this.polyTexUVList = [];
		for(let i = 0;i < this.vertexNumForPrimitive * 2;i += 6)
		{
			this.polyTexUVList.push(texUvList[0]);
			this.polyTexUVList.push(texUvList[1]);
			this.polyTexUVList.push(texUvList[2]);
			
			this.polyTexUVList.push(texUvList[2]);
			this.polyTexUVList.push(texUvList[1]);
			this.polyTexUVList.push(texUvList[3]);
		}	
	}
}

// Cube Object Manager
class CubeObjMan extends Obj3dManBase
{
	// Constructor
	constructor()
	{
		// Initialization
		super();
		
		// Generate Vertex List
		this.create();
	}

	// Generate object vertex list
	create()
	{
		// Secure data area
		const totalVertex    = 4 * 2;							// Number of vertices
		const totalPolygon   = 6 * 2;							// Number of polygons
		const totalPolyIndex = totalPolygon *					// Vertex Index
							   this.vertexNumForPrimitive;		// Total amount of info
		this.vertexList = [];
		for(let i = 0;i < totalVertex;++i)
		{
			this.vertexList.push(new VertexMan());
		}
		this.polyIndexList = new Int16Array(totalPolyIndex);
		this.vertexNum     = totalVertex;
		this.primitiveNum  = totalPolygon;

		// Cube vertices are front and back in following order
		// Total 8 points
		//
		// 0-----2  4-----6
		// | Front  |  | Back  |
	    // |     |  |     |
		// 1-----3  5-----7
		//
		// Assuming length of each side is 1.0 appropriately for now
		// Use enlarged
		// Front face vertices are 0,1,2,3 and back face vertices are 4,5,6,7.
		// Since coordinates match OpenGL's right-handed coordinate system, +Z is front and -Z is back.
		//	
		this.vertexList[0].vv.x = -0.5; this.vertexList[0].vv.y =  0.5; this.vertexList[0].vv.z =  0.5;
		this.vertexList[1].vv.x = -0.5; this.vertexList[1].vv.y = -0.5; this.vertexList[1].vv.z =  0.5;
		this.vertexList[2].vv.x =  0.5; this.vertexList[2].vv.y =  0.5; this.vertexList[2].vv.z =  0.5;
		this.vertexList[3].vv.x =  0.5; this.vertexList[3].vv.y = -0.5; this.vertexList[3].vv.z =  0.5;
		this.vertexList[4].vv.x = -0.5; this.vertexList[4].vv.y =  0.5; this.vertexList[4].vv.z = -0.5;
		this.vertexList[5].vv.x = -0.5; this.vertexList[5].vv.y = -0.5; this.vertexList[5].vv.z = -0.5;
		this.vertexList[6].vv.x =  0.5; this.vertexList[6].vv.y =  0.5; this.vertexList[6].vv.z = -0.5;
		this.vertexList[7].vv.x =  0.5; this.vertexList[7].vv.y = -0.5; this.vertexList[7].vv.z = -0.5;
		
		// Create drawing order index of each vertex for polygon drawing
		//
		// The direction of the polygon surface is counter-clockwise (left rotation) to match OpenGL system
		// Assumed to be front.
		// Surface direction is represented by normal vector direction, and normal vector is vertex order A,B,C
		// In the case of, calculate with the cross product of AB vector and AC vector.
		//
		// A----C 
		// |  ／|
	    // |／  |
		// B----D
		//
		// Based on this rule, in front of the other triangle BCD
		// The drawing order of vertices to face is C, B, D.
		//
		// Front: A,B,C,C,B,D
		//
		const drawIndexList = 
		[
			0,1,2,2,1,3,	//Front
			6,7,4,4,7,5,	//Back face (far side becomes front)
			2,3,6,6,3,7,	//Right Face
			4,5,0,0,5,1,	//Left Face
			4,0,6,6,0,2,	//Top Face
			1,5,3,3,5,7		//Bottom Face
		];
		for(let i = 0;i < totalPolyIndex;++i)
		{
			this.polyIndexList[i] = drawIndexList[i];
		}
		
		// Generate array to pour into vertex buffer in advance
		this.polyVertexList = new Float32Array(totalVertex * 4);
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
		
		// Create UV coordinate list for border drawing corresponding to vertex index
		//
		// -1,1  1,1
		//   0----2 
		//   |  ／|
	    //   |／  |
		//   1----3
		// -1,-1 1,-1
		//
		const uvList = 
		[
			{ u: -1, v:  1 },
			{ u: -1, v: -1 },
			{ u:  1, v:  1 },
			{ u:  1, v: -1 }
		];
		this.polyUVList = [];
		for(let i = 0;i < totalPolyIndex;i += 6)
		{
			this.polyUVList.push(uvList[0]);
			this.polyUVList.push(uvList[1]);
			this.polyUVList.push(uvList[2]);
			
			this.polyUVList.push(uvList[2]);
			this.polyUVList.push(uvList[1]);
			this.polyUVList.push(uvList[3]);
		}
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		//
		//  Side        Top/Bottom
		//  0,1 0.5,1  0.5,1  1,1
		//   0----2      0----2 0
		//   |  ／|      |  ／|
	    //   |／  |      |／  |
		//   1----3      1----3
		//  0,0 0.5,0  0.5,0  1,0
		//
		// Texture UV coordinates are set to bottom-left origin to match OpenGL.
		// To make cube side and top/bottom surfaces different images, horizontally long
		// Prepare textures and divide allocation.
		//
		const texUvList = 
		[
			{ u:  0, v:  1 },{ u:  0, v:  0 },
			{ u:0.5, v:  1 },{ u:0.5, v:  0 },
			
			{ u:0.5, v:  1 },{ u:0.5, v:  0 },
			{ u:  1, v:  1 },{ u:  1, v:  0 }
		];
		this.polyTexUVList = [];
		for(let i = 0;i < this.vertexNumForPrimitive * 2 * 4;i += 6)
		{
			this.polyTexUVList.push(texUvList[0]);
			this.polyTexUVList.push(texUvList[1]);
			this.polyTexUVList.push(texUvList[2]);
			
			this.polyTexUVList.push(texUvList[2]);
			this.polyTexUVList.push(texUvList[1]);
			this.polyTexUVList.push(texUvList[3]);
		}
		for(let i = 0;i < this.vertexNumForPrimitive * 2 * 2;i += 6)
		{
			this.polyTexUVList.push(texUvList[4]);
			this.polyTexUVList.push(texUvList[5]);
			this.polyTexUVList.push(texUvList[6]);
			
			this.polyTexUVList.push(texUvList[6]);
			this.polyTexUVList.push(texUvList[5]);
			this.polyTexUVList.push(texUvList[7]);
		}
	}
}

// Flat Ring Object Manager
class SquareRingObjMan extends Obj3dManBase
{
	// Constructor
	constructor()
	{
		// Initialization
		super();
		
		// Generate Vertex List
		this.create();
	}

	// Generate object vertex list
	create()
	{
		// Secure data area
		const totalVertex    = 4 * 2;							// Number of vertices
		const totalPolygon   = 4 * 2 * 2;						// Number of polygons
		const totalPolyIndex = totalPolygon *					// Vertex Index
							   this.vertexNumForPrimitive;		// Total amount of info
		this.vertexList = [];
		for(let i = 0;i < totalVertex;++i)
		{
			this.vertexList.push(new VertexMan());
		}
		this.polyIndexList = new Int16Array(totalPolyIndex);
		this.vertexNum     = totalVertex;
		this.primitiveNum  = totalPolygon;

		// Vertices of plane ring are front and back in the following order
		// Total 8 points
		// Vertex positions are same as cube, but as polygon
		// Surfaces to use are 2 side surfaces and top surface, excluding front and back surfaces
		// 下面の計4つになります。1面に付きポリゴン2つ。
		// and inward polygons so that the inside is also drawn
		// Prepare ..., so double that, total 4 * 2 * 2 = 16 sheets.
		//
		// 0-----2  4-----6
		// | Front  |  | Back  |
	    // |     |  |     |
		// 1-----3  5-----7
		//
		// Square when viewed from the front, which becomes the circumference of the ring
		// Assuming length of each side is 1.0 for now, ring width is
		// Set to 0.0625, 1/16 of square.
		// Use enlarged when displaying
		// Front frame vertices are 0,1,2,3 and back frame vertices are 4,5,6,7.
		// Since coordinates match OpenGL's right-handed coordinate system,
		// +Z is front and -Z is back.
		//	
		this.vertexList[0].vv.x = -0.5; this.vertexList[0].vv.y =  0.5; this.vertexList[0].vv.z =  0.0625/2;
		this.vertexList[1].vv.x = -0.5; this.vertexList[1].vv.y = -0.5; this.vertexList[1].vv.z =  0.0625/2;
		this.vertexList[2].vv.x =  0.5; this.vertexList[2].vv.y =  0.5; this.vertexList[2].vv.z =  0.0625/2;
		this.vertexList[3].vv.x =  0.5; this.vertexList[3].vv.y = -0.5; this.vertexList[3].vv.z =  0.0625/2;
		this.vertexList[4].vv.x = -0.5; this.vertexList[4].vv.y =  0.5; this.vertexList[4].vv.z = -0.0625/2;
		this.vertexList[5].vv.x = -0.5; this.vertexList[5].vv.y = -0.5; this.vertexList[5].vv.z = -0.0625/2;
		this.vertexList[6].vv.x =  0.5; this.vertexList[6].vv.y =  0.5; this.vertexList[6].vv.z = -0.0625/2;
		this.vertexList[7].vv.x =  0.5; this.vertexList[7].vv.y = -0.5; this.vertexList[7].vv.z = -0.0625/2;

		// Create drawing order index of each vertex for polygon drawing
		//
		// The direction of the polygon surface is counter-clockwise (left rotation) to match OpenGL system
		// Assumed to be front.
		// Surface direction is represented by normal vector direction, and normal vector is vertex order A,B,C
		// In the case of, calculate with the cross product of AB vector and AC vector.
		// 
		// A----C 
		// |  ／|
	    // |／  |
		// B----D
		//
		// Based on this rule, in front of the other triangle BCD
		// The drawing order of vertices to face is C, B, D.
		// 
		// Since I'm making inward faces too this time, normal vectors in the opposite direction
		// Drawing order of polygon vertices held becomes A,C,B and C,D,B
		// It becomes.
		//
		const drawIndexList = 
		[
			4,0,6, 6,0,2,	//Top Face (Front)
			6,2,4, 4,2,0,	//Top Face (Back)
			7,3,5, 5,3,1,	//Bottom Face (Front)
			5,1,7, 7,1,3,	//Bottom Face (Back)
			4,5,0, 0,5,1,	//Left Face (Front)
			0,1,4, 4,1,5,	//Left Face (Back)
			2,3,6, 6,3,7,	//Right Face (Front)
			6,7,2, 2,7,3	//Right Face (Back)
		];
		for(let i = 0;i < totalPolyIndex;++i)
		{
			this.polyIndexList[i] = drawIndexList[i];
		}
		
		// Generate array to pour into vertex buffer in advance
		this.polyVertexList = new Float32Array(totalVertex * 4);
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
		
		// Create UV coordinate list for border drawing corresponding to vertex index
		//
		// -1,1  1,1
		//   0----2 
		//   |  ／|
	    //   |／  |
		//   1----3
		// -1,-1 1,-1
		//
		const uvList = 
		[
			{ u: -1, v:  1 },
			{ u: -1, v: -1 },
			{ u:  1, v:  1 },
			{ u:  1, v: -1 }
		];
		this.polyUVList = [];
		for(let i = 0;i < totalPolyIndex;i += 6)
		{
			this.polyUVList.push(uvList[0]);
			this.polyUVList.push(uvList[1]);
			this.polyUVList.push(uvList[2]);
			
			this.polyUVList.push(uvList[2]);
			this.polyUVList.push(uvList[1]);
			this.polyUVList.push(uvList[3]);
		}
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		this.action_down_uv(0);
		
	}
	
	action_down_uv(t)
	{
		// Input t = 0.0 - 1.0 to get texture UV coordinate v
		// Change
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		//
		//  0,1  1,1
		//   0----2 
		//   |  ／| 
	    //   |／  | 
		//   1----3 
		//  0,0  1,0
		//
		// Texture UV coordinates are set to bottom-left origin to match OpenGL.
		// To make cube side and top/bottom surfaces different images, horizontally long
		// Prepare textures and divide allocation.
		//
		const texUvList = 
		[
			{ u:  0, v:  2.0-t },{ u:  0, v:  1.0-t },
			{ u:  1, v:  2.0-t },{ u:  1, v:  1.0-t }
		];
		this.polyTexUVList = [];
		for(let i = 0;i < this.polyUVList.length;i += 6)
		{
			this.polyTexUVList.push(texUvList[0]);
			this.polyTexUVList.push(texUvList[1]);
			this.polyTexUVList.push(texUvList[2]);
			
			this.polyTexUVList.push(texUvList[2]);
			this.polyTexUVList.push(texUvList[1]);
			this.polyTexUVList.push(texUvList[3]);
		}	
	}
}

// Torus Object Manager
class TorusObjMan extends Obj3dManBase
{
	// Constructor
	constructor()
	{
		// Initialization
		super();
		
		// Generate Vertex List
		this.create(DEF_TORUS_NUM);
	}

	// Generate object vertex list
	create(n)
	{
		// Secure data area
		const totalVertex    = n * n;							// Number of vertices
		const totalPolygon   = totalVertex * 2;					// Number of polygons
		const totalPolyIndex = totalPolygon *					// Vertex Index
							   this.vertexNumForPrimitive;		// Total amount of info
		this.vertexList = [];
		for(let i = 0;i < totalVertex;++i)
		{
			this.vertexList.push(new VertexMan());
		}
		this.polyIndexList = new Int16Array(totalPolyIndex);
		this.vertexNum     = totalVertex;
		this.primitiveNum  = totalPolygon;

		//
		// Rotate coordinates of each vertex of n-gon around Y-axis to form an n-gon looking from the top
		// Complete the torus figure
		// This creates a basic n-gon on the X-Y plane, translates it by the diameter of the n-gon in the X direction
		// After moving, coordinates can be calculated by rotating 360/n degrees around Y axis
		//

		// Set basic coordinates of n-gon
		let baseVectors = [];
		const radius    = 0.8;					// Radius of n-gon
		let   angle     = 0.0;					// Angle of n-gon
		let   addAngle  = (Math.PI * 2.0 / n);	// Angle increment value for n-gon
		for(let i = 0;i < n;++i,angle += addAngle)
		{
			baseVectors.push(new VectorMan4());
			baseVectors[i].x = radius * Math.cos(angle);
			baseVectors[i].y = radius * Math.sin(angle);
			baseVectors[i].z = 0.0;
		}

		// To translate basic figure by n-gon diameter in X direction
		// Create Translation Matrix
		let mMove = new MatrixMan4();
		mMove.translate(radius * 2.0,0.0,0.0);

		// After translating basic figure, rotate around Y axis
		// Calculate vertex coordinates of torus shape
		let index = 0;
		angle = 0.0;
		for(let i = 0;i < n;++i,angle += addAngle)
		{
			// Create rotation matrix
			let mRotate = new MatrixMan4();
			mRotate.rotateY(-angle);		// Rotate clockwise (right turn)

			// Compose with Translation Matrix
			let m = new MatrixMan4();
			m = m.mul(mMove);
			m = m.mul(mRotate);

			// Transform basic figure to create coordinates
			for(let j = 0;j < n;++j)
			{
				this.vertexList[index].vv.copy(baseVectors[j]);
				this.vertexList[index].vv.mul_matrix(m);
				index++;
			}
		}	
		baseVectors = [];	// won't use anymore

		// Create drawing order index list of vertices for polygon
		index = 0;

		// Rotation loop around Y axis (X-Z plane)	
		for(let xz = 0;xz < n;++xz)
		{
			const firstpos = n * xz;	// Index of first vertex of each polygon

			// Polygon vertex loop on X-Y plane
			//
			// Set the vertex drawing order as explained below so that the polygon surface faces outward
			//
			// The direction of the polygon surface is counter-clockwise (left rotation) to match OpenGL system
			// Assumed to be front.
			// Surface direction is represented by normal vector direction, and normal vector is vertex order A,B,C
			// In the case of, calculate with the cross product of AB vector and AC vector.
			// 
			// A----C 
			// |  ／|
	    	// |／  |
			// B----D
			//
			// Based on this rule, in front of the other triangle BCD
			// The drawing order of vertices to face is C, B, D.
			//
			for(let xy = 0;xy < n;++xy)
			{
				// Order is index order in tetragonal torus
				// Case of n = 4
				//
				//   0+--+4  Front: 0,1,4,4,1,5
				//    |／|   
				//   1+--+5  Front: 1,2,5,5,1,2
				//    |／|   
				//   2+--+6  :
				//    |／|   :
				//   3+--+7  Front: 3,0,7,7,0,4
				//    |／|   
				//   0+--+4
				//   ↑
				//   firstpos
				//
				
				this.polyIndexList[index++] =  firstpos +   xy;									//0
				this.polyIndexList[index++] =  firstpos + ((xy + 1)  % n);						//1
				this.polyIndexList[index++] = (firstpos +  (xy + n)          ) % totalVertex;	//4
				this.polyIndexList[index++] = (firstpos +  (xy + n)          ) % totalVertex;	//4
				this.polyIndexList[index++] =  firstpos + ((xy + 1)  % n);						//1
				this.polyIndexList[index++] = (firstpos + ((xy + 1)  % n) + n) % totalVertex;	//5
			}
		}
		
		// Generate array to pour into vertex buffer in advance
		this.polyVertexList = new Float32Array(totalVertex * 4);
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
		
		// TODO *** Create UV coordinate list for border drawing corresponding to vertex index
	}
}

// Twisted Torus Object Manager
class TwistTorusObjMan extends Obj3dManBase
{
	// Constructor
	constructor()
	{
		// Initialization
		super();
		
		// Generate Vertex List
		this.create(8);
		
		// Initialize Twist Action Counter
		this.act_cnt = 0;
	}
	
	// Generate object vertex list
	create(n)
	{
		// Secure data area
		const r_n            = 16;								// Number of cross sections
		const totalVertex    = n * r_n;							// Number of vertices
		const totalPolygon   = totalVertex * 2;					// Number of polygons
		const totalPolyIndex = totalPolygon *					// Vertex Index
							   this.vertexNumForPrimitive;		// Total amount of info
		this.vertexList = [];
		for(let i = 0;i < totalVertex;++i)
		{
			this.vertexList.push(new VertexMan());
		}
		this.polyIndexList   = new Int16Array(totalPolyIndex);
		this.vertexNum       = totalVertex;
		this.primitiveNum    = totalPolygon;
		this.unit_vertex_num = n;				// Number of vertices per cross section
		this.unit_round_num  = r_n;				// Number of cross sections
		
		//
		// Rotate coordinates of each vertex of n-gon around Y-axis to form an n-gon looking from the top
		// Complete the torus figure
		// This creates a basic n-gon on the X-Y plane, translates it by in_radius in the X direction
		// After moving, coordinates can be calculated by rotating 360/r_n degrees around Y axis
		//

		// Set basic coordinates of n-gon
		let baseVectors = [];
		const radius    = 0.8;					// Radius of n-gon
		let   angle     = 0.0;					// Angle of n-gon
		let   addAngle  = (Math.PI * 2.0 / n);	// Angle increment value for n-gon
		for(let i = 0;i < n;++i,angle += addAngle)
		{
			baseVectors.push(new VectorMan4());
			baseVectors[i].x = radius * Math.cos(angle);
			baseVectors[i].y = radius * Math.sin(angle);
			baseVectors[i].z = 0.0;
		}

		// To translate basic figure by inner radius
		// Create Translation Matrix
		const in_radius = 1.8;
		let mMove = new MatrixMan4();
		mMove.translate(in_radius,0.0,0.0);

		// Initialize information array for Twist Action
		this.act_info = [];
		for(let i = 0;i < r_n;++i)
		{
			let info = { tx: in_radius, ry: 0, dir: 0, a: 0, r: 0 };
			this.act_info.push(info);
		}

		// After translating basic figure, rotate around Y axis
		// Calculate vertex coordinates of torus shape
		let index       = 0;
		let r_angle     = 0.0;
		let r_addAngle  = (Math.PI * 2.0 / r_n);	// Angle increment value for n-gon
		for(let i = 0;i < r_n;++i,r_angle += r_addAngle)
		{
			// Create rotation matrix
			let mRotate = new MatrixMan4();
			mRotate.rotateY(-r_angle);		// Rotate clockwise (right turn)

			// Compose with Translation Matrix
			let m = new MatrixMan4();
			m = m.mul(mMove);
			m = m.mul(mRotate);

			// Transform basic figure to create coordinates
			for(let j = 0;j < n;++j)
			{
				this.vertexList[index].vv.copy(baseVectors[j]);
				this.vertexList[index].vv.mul_matrix(m);
				index++;
			}
			
			// Remember arrangement info
			this.act_info[i].ry = -r_angle;
		}	
		baseVectors = [];	// won't use anymore

		// Create drawing order index list of vertices for polygon
		index = 0;

		// Rotation loop around Y axis (X-Z plane)	
		for(let xz = 0;xz < r_n;++xz)
		{
			const firstpos = n * xz;	// Index of first vertex of each polygon

			// Polygon vertex loop on X-Y plane
			//
			// Set the vertex drawing order as explained below so that the polygon surface faces outward
			//
			
			// Set the vertex drawing order as explained below so that the polygon surface faces outward
			//
			// The direction of the polygon surface is counter-clockwise (left rotation) to match OpenGL system
			// Assumed to be front.
			// Surface direction is represented by normal vector direction, and normal vector is vertex order A,B,C
			// In the case of, calculate with the cross product of AB vector and AC vector.
			// 
			// A----C 
			// |  ／|
	    	// |／  |
			// B----D
			//
			// Based on this rule, in front of the other triangle BCD
			// The drawing order of vertices to face is C, B, D.
			//
			for(let xy = 0;xy < n;++xy)
			{
				// Order is index order in tetragonal torus
				// Case of n = 4
				//
				//   0+--+4  Front: 0,1,4,4,1,5
				//    |／|   
				//   1+--+5  Front: 1,2,5,5,1,2
				//    |／|   
				//   2+--+6  :
				//    |／|   :
				//   3+--+7  Front: 3,0,7,7,0,4
				//    |／|   
				//   0+--+4
				//   ↑
				//   firstpos
				//
				this.polyIndexList[index++] =  firstpos +   xy;									//0
				this.polyIndexList[index++] =  firstpos + ((xy + 1)  % n);						//1
				this.polyIndexList[index++] = (firstpos +  (xy + n)          ) % totalVertex;	//4
				this.polyIndexList[index++] = (firstpos +  (xy + n)          ) % totalVertex;	//4
				this.polyIndexList[index++] =  firstpos + ((xy + 1)  % n);						//1
				this.polyIndexList[index++] = (firstpos + ((xy + 1)  % n) + n) % totalVertex;	//5
			}
		}
		
		// Generate array to pour into vertex buffer in advance
		this.polyVertexList = new Float32Array(totalVertex * 4);
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
		
		// TODO *** Create UV coordinate list for border drawing corresponding to vertex index
	}
	
	// Twist Action
	action()
	{
		const r_n = this.unit_round_num;
			
		// Decide action
		if(!(this.act_cnt++ % 100))
		{
			for(let i = 0;i < r_n;++i)
			{
				const unitAngle      = rad(2);						// Angle per rotation
				this.act_info[i].dir = rnd(2) * (-1 * rnd(2));		// One of -1, 0, 1
				this.act_info[i].a   = unitAngle * (rnd(2) + 1)		// Randomly double the rotation angle
									   * this.act_info[i].dir;		// Direction is determined by dir
			}
		}
		
		// Rotate vertices of all cross sections
		const v_n = this.unit_vertex_num;
		for(let i = 0;i < r_n;++i)
		{
			// Once revert rotation on Y axis and translation on X axis,
			// After bringing cross section to center, rotate on Z axis, then translate again
			// Generate matrix multiplying translation and rotation
			//
			// Order of multiplication is,
			// Negative Y-axis rotation -> Negative translation -> Z-axis rotation -> Positive translation -> Positive Y-axis rotation
			// It becomes.
			//
			let m        = new MatrixMan4();
			let mRYplus  = new MatrixMan4();
			let mRYminus = new MatrixMan4();
			let mTXplus  = new MatrixMan4();
			let mTXMinus = new MatrixMan4();
			let mRZ      = new MatrixMan4();
			const tx     = this.act_info[i].tx;
			const ry     = this.act_info[i].ry;
			
			mRYplus.rotateY(ry);
			mRYminus.rotateY(-ry);
			mTXplus.translate(tx,0.0,0.0);
			mTXMinus.translate(-tx,0.0,0.0);
			
			// Reverse rotation if rotated more than 60 degrees
			if(Math.abs(this.act_info[i].r) >= Math.PI/3)
			{
				this.act_info[i].a   *= -1;
				this.act_info[i].dir *= -1;
			}
			
			mRZ.rotateZ(this.act_info[i].a);
			this.act_info[i].r += this.act_info[i].a;
			
			// Composition
			m = m.mul(mRYminus);
			m = m.mul(mTXMinus);
			m = m.mul(mRZ);
			m = m.mul(mTXplus);
			m = m.mul(mRYplus);
			
			const first = i * this.unit_vertex_num;
			for(let j = 0;j < v_n;++j)
			{
				// Apply to vertex coordinates
				this.vertexList[first+j].vv.mul_matrix(m);
			}
		}
		
		// Generate array to pour into vertex buffer in advance
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
	}
}

// Fan-shaped Torus Object Manager
class FanTorusObjMan extends Obj3dManBase
{
	// Constructor
	constructor(cvn,cr,ivn,ir,ia)
	{
		// Initialization
		super();
		
		// Meaning of parameters
		// cvn : Number of divided vertices of cut surface 
		// cr  : Radius of cut surface
		// ivn : Number of divided vertices of sector
		// ir  : Radius of sector center
		// ia  : Angle of sector
		
		ivn = 2;
		ia  = 30;
		cvn = 7;
		
		// Generate Vertex List
		this.create(cvn,cr,ivn,ir,ia);
	}

	// Generate object vertex list
	create(cvn,cr,ivn,ir,ia)
	{
		// Secure data area
		const totalVertex    = cvn * ivn;						// Number of vertices
		const totalPolygon   = cvn * (ivn-1) * 2 * 2;			// Number of polygons
		const totalPolyIndex = totalPolygon *					// Vertex Index
							   this.vertexNumForPrimitive;		// Total amount of info
		this.vertexList = [];
		for(let i = 0;i < totalVertex;++i)
		{
			this.vertexList.push(new VertexMan());
		}
		this.polyIndexList = new Int16Array(totalPolyIndex);
		this.vertexNum     = totalVertex;
		this.primitiveNum  = totalPolygon;

		//
		// Coordinates of each vertex of cvn-gon are formed by dividing angle ia into ivn parts looking from top around Y-axis
		// Rotate so that to complete the sector torus shape
		// This creates a basic cvn-gon on the X-Y plane, translates it by ir in the X direction, and then
		// Coordinates can be calculated by rotating ia degrees around the Y axis
		//

		// Set basic coordinates of cvn-gon
		let baseVectors = [];
		const radius    = cr;						// Radius of cvn-gon
		let   angle     = 0.0;						// Angle of cvn-gon
		let   addAngle  = (Math.PI * 2.0 / cvn);	// Angle increment value for cvn-gon
		for(let i = 0;i < cvn;++i,angle += addAngle)
		{
			baseVectors.push(new VectorMan4());
			baseVectors[i].x = radius * Math.cos(angle);
			baseVectors[i].y = radius * Math.sin(angle);
			baseVectors[i].z = 0.0;
		}

		// To translate basic figure by ir in X direction
		// Create Translation Matrix
		let mMove = new MatrixMan4();
		mMove.translate(ir,0.0,0.0);

		// After translating basic figure, rotate around Y axis
		// Calculate vertex coordinates of torus shape
		let index = 0;
		addAngle  = (rad(ia) / ivn);	// Sector angle increment value
		angle     = 0.0;
		for(let i = 0;i < ivn;++i,angle += addAngle)
		{
			// Create rotation matrix
			let mRotate = new MatrixMan4();
			mRotate.rotateY(-angle);		// Rotate clockwise (right turn)

			// Compose with Translation Matrix
			let m = new MatrixMan4();
			m = m.mul(mMove);
			m = m.mul(mRotate);

			// Transform basic figure to create coordinates
			for(let j = 0;j < cvn;++j)
			{
				this.vertexList[index].vv.copy(baseVectors[j]);
				this.vertexList[index].vv.mul_matrix(m);
				index++;
			}
		}	
		baseVectors = [];	// won't use anymore

		// Create drawing order index list of vertices for polygon
		index = 0;
		
		// Rotation loop around Y axis (X-Z plane)	
		for(let xz = 0;xz < (ivn-1);++xz)
		{
			const firstpos = cvn * xz;	// Index of first vertex of each polygon

			// Polygon vertex loop on X-Y plane
			//
			// Set the vertex drawing order as explained below so that the polygon surface faces outward
			//
			// The direction of the polygon surface is counter-clockwise (left rotation) to match OpenGL system
			// Assumed to be front.
			// Surface direction is represented by normal vector direction, and normal vector is of vertices A,B,C
			// Calculate with the cross product of AB vector and AC vector.
			//
			// A----C 
			// |  ／|
	    	// |／  |
			// B----D
			//
			// Based on this rule, in front of the other triangle BCD
			// The drawing order of vertices to face is C, B, D.
			//
			// Since I'm making inward faces too this time, normal vectors in the opposite direction
			// Drawing order of polygon vertices held becomes A,C,B and C,D,B
			// It becomes.
			// 
			// Front: A,B,C,C,B,D
			// Back: A,C,B,C,D,B
			//	
			for(let xy = 0;xy < cvn;++xy)
			{
				// Case of cvn = 4
				// Since I'm making both sides this time, I arranged them in an easy-to-understand order
				//
				//   0+--+4  Front: 0,1,4,4,1,5
				//    |／|   Back: 0,4,1,4,5,1
				//   1+--+5  Front: 1,2,5,5,1,2
				//    |／|   Back: 1,5,2,5,6,2
				//   2+--+6  :
				//    |／|   :
				//   3+--+7  Front: 3,0,7,7,0,4
				//    |／|   Back: 3,7,0,7,4,0
				//   0+--+4
				//   ↑
				//   firstpos
				//
				this.polyIndexList[index++] = firstpos +   xy;						//0
				this.polyIndexList[index++] = firstpos +  (xy + 1  ) % cvn;			//1
				this.polyIndexList[index++] = firstpos +  (xy + cvn);				//4
				this.polyIndexList[index++] = firstpos +  (xy + cvn);				//4
				this.polyIndexList[index++] = firstpos +  (xy + 1  ) % cvn;			//1
				this.polyIndexList[index++] = firstpos + ((xy + 1  ) % cvn) + cvn;	//5
				
				this.polyIndexList[index++] = firstpos +   xy;						//0
				this.polyIndexList[index++] = firstpos +  (xy + cvn);				//4
				this.polyIndexList[index++] = firstpos +  (xy + 1  ) % cvn;			//1
				this.polyIndexList[index++] = firstpos +  (xy + cvn);				//4
				this.polyIndexList[index++] = firstpos + ((xy + 1  ) % cvn) + cvn;	//5
				this.polyIndexList[index++] = firstpos +  (xy + 1  ) % cvn;			//1
			}
		}
		
		// Generate array to pour into vertex buffer in advance
		this.polyVertexList = new Float32Array(totalVertex * 4);
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
		
		// TODO *** Create UV coordinate list for border drawing corresponding to vertex index
	}
}

// Cylinder Object Manager
class CylinderObjMan extends Obj3dManBase
{
	// Constructor
	constructor()
	{
		// Initialization
		super();
		
		// Generate Vertex List
		this.create(DEF_CYLINDER_NUM);
	}

	// Generate object vertex list
	create(n)
	{
		// Secure data area
		const totalVertex    = n * 2;							// Number of vertices
		const totalPolygon   = totalVertex * 2;					// Number of polygons
		const totalPolyIndex = totalPolygon *					// Vertex Index
							   this.vertexNumForPrimitive;		// Total amount of info
		this.vertexList = [];
		for(let i = 0;i < totalVertex;++i)
		{
			this.vertexList.push(new VertexMan());
		}
		this.polyIndexList = new Int16Array(totalPolyIndex);
		this.vertexNum     = totalVertex;
		this.primitiveNum  = totalPolygon;

		//
		// A cylinder is created by placing vertices of an n-gon on the X-Z plane and expanding them along the Y axis
		// Create object.
		//
		
		// Set basic coordinates of n-gon
		const radius   = 0.4;					// Radius of n-gon
		let   angle    = 0.0;					// Angle of n-gon
		let   addAngle = (Math.PI * 2.0 / n);	// Angle increment value for n-gon
		for(let i = 0;i < n;++i,angle += addAngle)
		{
			// Make Y axis rotation clockwise (right rotation)
			this.vertexList[  i].vv.x = radius * Math.cos(-angle);	// Upper n-gon
			this.vertexList[  i].vv.z = radius * Math.sin(-angle);
			this.vertexList[  i].vv.y =  0.5;
			this.vertexList[n+i].vv.x = radius * Math.cos(-angle);	// Lower n-gon
			this.vertexList[n+i].vv.z = radius * Math.sin(-angle);
			this.vertexList[n+i].vv.y = -0.5;
		}

		// Create drawing order index list of vertices for polygon
		let index = 0;

		for(let i = 0;i < n;++i)
		{
			// Polygon vertex loop on X-Y plane
			//
			// Set the vertex drawing order as explained below so that the polygon surface faces outward
			//
			// The direction of the polygon surface is counter-clockwise (left rotation) to match OpenGL system
			// Assumed to be front.
			// Surface direction is represented by normal vector direction, and normal vector is vertex order A,B,C
			// In the case of, calculate with the cross product of AB vector and AC vector.
			// 
			// A----C 
			// |  ／|
	    	// |／  |
			// B----D
			//
			// Based on this rule, in front of the other triangle BCD
			// The drawing order of vertices to face is C, B, D.
			//
			
			// Order is index order in quadrangular prism
			// Case of n = 4
			//
			//   0  1  2
			//   +--+--+… Front: 0,4,1,1,4,5
			//   |／|／|   Back: 0,1,4,1,5,4
			//   +--+--+… Front: 1,5,2,2,5,6
			//   4  5  6   Front: 1,2,5,2,6,5
			//
			
			// Create outward polygon
			this.polyIndexList[index++] =   i;					//0
			this.polyIndexList[index++] =   i + n;				//4
			this.polyIndexList[index++] =   (i + 1) % n;		//1
			this.polyIndexList[index++] =   (i + 1) % n;		//1
			this.polyIndexList[index++] =   i + n;				//4
			this.polyIndexList[index++] =  ((i + 1) % n) + n;	//5
			
			// Create inward polygon
			this.polyIndexList[index++] =   i;					//0
			this.polyIndexList[index++] =   (i + 1) % n;		//1
			this.polyIndexList[index++] =   i + n;				//4
			this.polyIndexList[index++] =   (i + 1) % n;		//1
			this.polyIndexList[index++] =  ((i + 1) % n) + n;	//5
			this.polyIndexList[index++] =   i + n;				//4
		}
		
		// Generate array to pour into vertex buffer in advance
		this.polyVertexList = new Float32Array(totalVertex * 4);
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
		
		// TODO *** Create UV coordinate list for border drawing corresponding to vertex index
	}
}

// n-gonal Pyramid Object Manager
class PyramidObjMan extends Obj3dManBase
{
	// Constructor
	constructor()
	{
		// Initialization
		super();
		
		// Generate Vertex List
		this.create(DEF_PYRAMID_NUM);
	}

	// Generate object vertex list
	create(n)
	{
		// Secure data area
		const totalVertex    = n + 2;							// Number of vertices
		const totalPolygon   = n * 2;							// Number of polygons
		const totalPolyIndex = totalPolygon *					// Vertex Index
							   this.vertexNumForPrimitive;		// Total amount of info
		this.vertexList = [];
		for(let i = 0;i < totalVertex;++i)
		{
			this.vertexList.push(new VertexMan());
		}
		this.polyIndexList = new Int16Array(totalPolyIndex);
		this.vertexNum     = totalVertex;
		this.primitiveNum  = totalPolygon;
	
		//
		// Decide 1 point on top and 1 point on bottom center, and placed on X-Z plane,
		// By connecting vertices of n-gon with top and bottom center points, polygons are
		// Mold it.
		// Considering ease of calculation, bring top and center points to back
		// Going.
		//
		
		// Set vertex coordinates of n-gon
		const radius   = 0.5;					// Radius of n-gon
		let   angle    = 0.0;					// Angle of n-gon
		let   addAngle = (Math.PI * 2.0 / n);	// Angle increment value for n-gon
		for(let i = 0;i < n;++i,angle += addAngle)
		{
			// Make Y axis rotation counter-clockwise (left rotation)
			this.vertexList[i].vv.x = radius * Math.cos(angle);
			this.vertexList[i].vv.z = radius * Math.sin(angle);
			this.vertexList[i].vv.y = 0.0;
		}
		
		// Set vertex coordinates of top and bottom center points
		this.vertexList[n  ].vv.x = 0.0;
		this.vertexList[n  ].vv.y = radius;
		this.vertexList[n  ].vv.z = 0.0;
		this.vertexList[n+1].vv.x = 0.0;
		this.vertexList[n+1].vv.y = 0.0;
		this.vertexList[n+1].vv.z = 0.0;
				
		// Create drawing order index list of vertices for polygon
		let index = 0;
		
		for(let i = 0;i < n;++i)
		{
			// Slope polygon vertex loop
			//
			// Set the vertex drawing order as explained below so that the polygon surface faces outward
			//
			// The direction of the polygon surface is counter-clockwise (left rotation) to match OpenGL system
			// Assumed to be front.
			// Surface direction is represented by normal vector direction, and normal vector is vertex order A,B,C
			// In the case of, calculate with the cross product of AB vector and AC vector.
			// 
			//      A 
			//    ／|＼
	    	//  ／  |  ＼
			// B----C----D
			//
			// Based on this rule, the vertex order of the polygon of the slope with A as the top is
			// A,B,C A,C,D 
			// It becomes.
			//
			// Numbers are in index order for square pyramid
			//   Case of n = 4
			//
			//      n  (n+1 is the center of the bottom)
			//      +      
			//    ／|＼    Front: n,0,1,n,1,2
			//   +--+--+… Bottom: n+1,1,0,n+1,2,1
			//   0  1  2   
			//
			
			// Create slope polygon
			this.polyIndexList[index + 0] =  n;				//n
			this.polyIndexList[index + 1] =  i;				//0
			this.polyIndexList[index + 2] = (i + 1) % n;	//1
			
			// Create bottom polygon
			const o = DEF_VERTEX_NUM_FOR_PRIMITIVE * n;
			this.polyIndexList[index+o+0] =  n+1;			//n+1
			this.polyIndexList[index+o+1] = (i + 1) % n;	//1
			this.polyIndexList[index+o+2] =  i;				//0
			
			index += DEF_VERTEX_NUM_FOR_PRIMITIVE;
		}
		
		// Generate array to pour into vertex buffer in advance
		this.polyVertexList = new Float32Array(totalVertex * 4);
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
		
		// TODO *** Create UV coordinate list for border drawing corresponding to vertex index
	}
}

// Sphere Object Manager
class SphereObjMan extends Obj3dManBase
{
	// Constructor
	constructor()
	{
		// Initialization
		super();
		
		// Generate Vertex List
		this.create(DEF_SPHERE_NUM);
	}

	// Generate object vertex list
	create(n)
	{
		// Secure data area
		// n is number of hemisphere divisions
		const totalVertex    = (n * 2) * (n - 1) + 2;			// Number of vertices
		const totalPolygon   = (n * 2) * 2 + (n * 4) * (n - 2);	// Number of polygons
		const totalPolyIndex = totalPolygon *					// Vertex Index
							   this.vertexNumForPrimitive;		// Total amount of info
		this.vertexList = [];
		for(let i = 0;i < totalVertex;++i)
		{
			this.vertexList.push(new VertexMan());
		}
		this.polyIndexList = new Int16Array(totalPolyIndex);
		this.vertexNum     = totalVertex;
		this.primitiveNum  = totalPolygon;
	
		//
		// Decide 1 point on top and 1 point on bottom center, and placed on X-Z plane,
		// By connecting vertices of n-gon with top and bottom center points, polygons are
		// Mold it.
		// Considering ease of calculation, bring top and center points to back
		// Going.
		//
		
		// Set vertex coordinates of n-gon
		const radius   = 0.5;					// Radius of n-gon
		let   angle    = 0.0;					// Angle of n-gon
		let   addAngle = (Math.PI / n);			// Angle increment value for n-gon
		let   v        = new VectorMan4();
		let   vv       = new VectorMan4();
		let   my       = new MatrixMan4();
		let   mz       = new MatrixMan4();
		let   m        = new MatrixMan4();
		let   index    = 0;
		for(let i = 0;i < (n * 2);++i)
		{
			// Set reference coordinates on XZ plane
			v.setValue(radius,0.0,0.0,1.0);
			
			// Rotation on Y axis
			my.rotateY(addAngle * i);
			
			for(let j = 1;j < n;++j)
			{
				// Rotate reference point around Z and Y axes,
				// Order from top of vertically cut sphere
				
				// Set rotation descending from top to bottom by Z axis rotation
				mz.rotateZ(rad(90)-addAngle * j);
				
				// Compose rotation transformation matrix
				m.initialize();
				m.mul(mz);
				m.mul(my);
				
				// Apply rotation to reference coordinates
				vv.copy(v);
				vv.mul_matrix(m);
				
				this.vertexList[index++].vv.copy(vv);
			}
			angle += addAngle;
		}
		
		// Add top and bottom center points
		this.vertexList[index++].vv.setValue(0.0, radius,0.0,1.0);
		this.vertexList[index++].vv.setValue(0.0,-radius,0.0,1.0);

		// Create drawing order index list of vertices for polygon
		index = 0;
		const a = (n * 2) * (n - 1);
		
		for(let i = 0;i < (n * 2);++i)
		{
			// Slope polygon vertex loop
			//
			// Set the vertex drawing order as explained below so that the polygon surface faces outward
			//
			// The direction of the polygon surface is counter-clockwise (left rotation) to match OpenGL system
			// Assumed to be front.
			// Surface direction is represented by normal vector direction, and normal vector is vertex order A,B,E
			// In the case of, calculate with the cross product of AB vector and AE vector.
			// 
			//      A 
			//    ／|＼
	    	//  ／  |  ＼
			// B----E----G
			// |  ／|  ／|
			// |／  |／  |
			// C----F----H
			//  ＼  |  ／
			//    ＼|／
			//      D
			//
			// Based on this rule, the vertex order of the polygon of the slope is
			// A,B,E 
			// B,C,E E,C,F
			// C,D,F
			// …
			// It becomes.
			//
			// Numbers are in index order for case n = 4
			//
			//      a      a = (n - 1) * (n * 2)
			//      +      
			//    ／|＼     a,0,3 0,1,3 3,1,4 1,2,4 4,2,5 2,a+1,5
			//   0--3--6…  a,3,6 3,4,6 6,4,7 4,5,7 7,5,8 5,a+1,8
			//   |／|／|   
			//   1--4--7…
			//   |／|／|   
			//   2--5--8…
			//    ＼|／
			//     a+1 
			//
			
			for(let j = 0;j < (n - 1);++j)
			{
				// Create slope polygon
				const first = (n - 1) * i;
				const num   = (n - 1) * (n * 2);
				
				if(j == 0)
				{
					// Top Lid
					this.polyIndexList[index++] =  a;						//a
					this.polyIndexList[index++] =  first;					//0
					this.polyIndexList[index++] = (first + n - 1) % num;	//3
				}
				
				if(j == (n - 2))
				{
					// Bottom Lid
					this.polyIndexList[index++] =  first + j;				//2
					this.polyIndexList[index++] =  a+1;						//a+1
					this.polyIndexList[index++] = (first+j + n-1) % num;	//5
				}
				else
				{
					// Middle
					this.polyIndexList[index++] =  first + j;				//0
					this.polyIndexList[index++] =  first + j + 1;			//1
					this.polyIndexList[index++] = (first+j + n-1) % num;	//3
					
					this.polyIndexList[index++] = (first+j + n-1) % num;	//3
					this.polyIndexList[index++] =  first + j + 1;			//1
					this.polyIndexList[index++] = (first+j + n-1 +1) % num;	//4
				}
			}
		}
		
		// Generate array to pour into vertex buffer in advance
		this.polyVertexList = new Float32Array(totalVertex * 4);
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
		
		// TODO *** Create UV coordinate list for border drawing corresponding to vertex index
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		//
		//  0,1  1,1
		//   +----+ 
		//   |  ／| 
	    //   |／  | 
		//   +----+ 
		//  0,0  1,0
		//
		// Texture UV coordinates are set to bottom-left origin to match OpenGL.
		// Sphere polygons are quadrangles of 2 polygons connected vertically n times from top to bottom
		// are connected horizontally by n * 2.
		// However, the top and bottom lids will be single triangle polygons.
		//
		const u_unit  = 1.0 / (n * 2);
		const v_unit  = 1.0 / n;
		const uu_half = u_unit / 2;
		this.polyTexUVList = [];
		for(let i = 0;i < (n * 2);++i)
		{
			for(let j = 0;j < (n - 1);++j)
			{
				
				const first = (n - 1) * i;
				const num   = (n - 1) * (n * 2);
				
				if(j == 0)
				{
					// Top Lid
					this.polyTexUVList.push({ u: u_unit * i + uu_half, v: 1.0           });	//a
					this.polyTexUVList.push({ u: u_unit * i          , v: 1.0 - v_unit  });	//0
					this.polyTexUVList.push({ u: u_unit * (i + 1)    , v: 1.0 - v_unit  });	//3
				}
				
				if(j == (n - 2))
				{
					// Bottom Lid
					this.polyTexUVList.push({ u: u_unit * i          , v: v_unit  });		//2
					this.polyTexUVList.push({ u: u_unit * i + uu_half, v: 0.0     });		//a+1
					this.polyTexUVList.push({ u: u_unit * (i + 1)    , v: v_unit  });		//5
				}
				else
				{
					// Middle
					this.polyTexUVList.push({ u: u_unit * i      , v: 1.0 - v_unit * (j + 1) });	//0
					this.polyTexUVList.push({ u: u_unit * i      , v: 1.0 - v_unit * (j + 2) });	//1
					this.polyTexUVList.push({ u: u_unit * (i + 1), v: 1.0 - v_unit * (j + 1) });	//3
					
					this.polyTexUVList.push({ u: u_unit * (i + 1), v: 1.0 - v_unit * (j + 1) });	//3
					this.polyTexUVList.push({ u: u_unit * i      , v: 1.0 - v_unit * (j + 2) });	//1
					this.polyTexUVList.push({ u: u_unit * (i + 1), v: 1.0 - v_unit * (j + 2) });	//4
				}
			}
		}
	}
}

// n-gon Circle Object Manager
class CircleObjMan extends Obj3dManBase
{
	// Constructor
	constructor()
	{
		// Initialization
		super();
		
		// Generate Vertex List
		this.create(DEF_CIRCLE_NUM);
	}

	// Generate object vertex list
	create(n)
	{
		// Secure data area
		const totalVertex    = n + 1;							// Number of vertices
		const totalPolygon   = n;								// Number of polygons
		const totalPolyIndex = totalPolygon *					// Vertex Index
							   this.vertexNumForPrimitive;		// Total amount of info
		this.vertexList = [];
		for(let i = 0;i < totalVertex;++i)
		{
			this.vertexList.push(new VertexMan());
		}
		this.polyIndexList = new Int16Array(totalPolyIndex);
		this.vertexNum     = totalVertex;
		this.primitiveNum  = totalPolygon;
	
		//
		// Decide one center point of circle, and polygon placed on X-Y plane
		// Mold it.
		// Considering ease of calculation, bring center point to back
		// Going.
		//
		
		// Set vertex coordinates of n-gon
		const radius   = 0.5;					// Radius of n-gon
		let   angle    = 0.0;					// Angle of n-gon
		let   addAngle = (Math.PI * 2.0 / n);	// Angle increment value for n-gon
		for(let i = 0;i < n;++i,angle += addAngle)
		{
			// Make Y axis rotation counter-clockwise (left rotation)
			this.vertexList[i].vv.x = radius * Math.cos(angle);
			this.vertexList[i].vv.y = radius * Math.sin(angle);
			this.vertexList[i].vv.z = 0.0;
		}
		
		// Set vertex coordinates of center point
		this.vertexList[n  ].vv.x = 0.0;
		this.vertexList[n  ].vv.y = 0.0;
		this.vertexList[n  ].vv.z = 0.0;
				
		// Create drawing order index list of vertices for polygon
		let index = 0;
		
		for(let i = 0;i < n;++i)
		{
			// Polygon Vertex Loop
			//
			// Set the vertex drawing order as explained below so that the polygon surface faces outward
			//
			// The direction of the polygon surface is counter-clockwise (left rotation) to match OpenGL system
			// Assumed to be front.
			// Surface direction is represented by normal vector direction, and normal vector is vertex order A,B,C
			// In the case of, calculate with the cross product of AB vector and AC vector.
			// 
			//      A 
			//    ／|＼
	    	//  ／  |  ＼
			// B----C----D
			//
			// Based on this rule, the vertex order of the polygon of the slope with A as the top is
			// A,B,C A,C,D 
			// It becomes.
			//
			// Numbers are in index order for square circle
			//   Case of n = 4
			//
			//      n
			//      +      
			//    ／|＼    Front: n,0,1,n,1,2
			//   +--+--+… 
			//   0  1  2   
			//
			
			// Create circular polygon
			this.polyIndexList[index + 0] =  n;				//n
			this.polyIndexList[index + 1] =  i;				//0
			this.polyIndexList[index + 2] = (i + 1) % n;	//1
			
			index += DEF_VERTEX_NUM_FOR_PRIMITIVE;
		}
		
		// Generate array to pour into vertex buffer in advance
		this.polyVertexList = new Float32Array(totalVertex * 4);
		for(let i = 0;i < totalVertex;++i)
		{
			this.polyVertexList[i * 4 + 0] = this.vertexList[i].vv.x;
			this.polyVertexList[i * 4 + 1] = this.vertexList[i].vv.y;
			this.polyVertexList[i * 4 + 2] = this.vertexList[i].vv.z;
			this.polyVertexList[i * 4 + 3] = this.vertexList[i].vv.w;
		}
		
		// TODO *** Create UV coordinate list for border drawing corresponding to vertex index
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		this.n = n;
		this.action_down_uv(0);
		
	}
	
	action_down_uv(t)
	{
		// Input t = 0.0 - 1.0 to get texture UV coordinate v
		// Change
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		//
		//  0,1  1,1
		//   +----+ 
		//   |  ／| 
	    //   |／  | 
		//   +----+ 
		//  0,0  1,0
		//
		// Texture UV coordinates are set to bottom-left origin to match OpenGL.
		// Since circular polygons are in the form of polar coordinate conversion, n-divided u coordinate
		// Make it move horizontally by each.
		//
		const u_unit  = 1.0 / this.n;
		const uu_half = u_unit / 2;
		this.polyTexUVList = [];
		for(let i = 0;i < this.n;++i)
		{
			this.polyTexUVList.push({ u: 0.5                 , v: 1.0 - t });	//n
			this.polyTexUVList.push({ u: u_unit * i          , v: 2.0 - t });	//0
			this.polyTexUVList.push({ u: u_unit * (i + 1)    , v: 2.0 - t });	//1
		}
	}
	
	action_right_down_uv(t)
	{
		// Input t = 0.0 - 1.0 to get texture UV coordinate uv
		// Change
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		//
		//  0,1  1,1
		//   +----+ 
		//   |  ／| 
	    //   |／  | 
		//   +----+ 
		//  0,0  1,0
		//
		// Texture UV coordinates are set to bottom-left origin to match OpenGL.
		// Since circular polygons are in the form of polar coordinate conversion, n-divided u coordinate
		// Make it move horizontally by each.
		//
		const u_unit  = 1.0 / this.n;
		const uu_half = u_unit / 2;
		this.polyTexUVList = [];
		for(let i = 0;i < this.n;++i)
		{
   			this.polyTexUVList.push({ u: 0.5                        , v: 1.0 - t });	//n
			this.polyTexUVList.push({ u: 1.0 - t + u_unit * i       , v: 2.0 - t });	//0
			this.polyTexUVList.push({ u: 1.0 - t + u_unit * (i + 1) , v: 2.0 - t });	//1
		}
	}
	
	action_screw_uv(t)
	{
		// Input t = 0.0 - 1.0 to get texture UV coordinate uv
		// Change
		
		// Create UV coordinate list for texture drawing corresponding to vertex index
		//
		//  0,1  1,1
		//   +----+ 
		//   |  ／| 
	    //   |／  | 
		//   +----+ 
		//  0,0  1,0
		//
		// Texture UV coordinates are set to bottom-left origin to match OpenGL.
		// Since circular polygons are in the form of polar coordinate conversion, n-divided u coordinate
		// Make it move horizontally by each.
		//
		const u_unit  = 1.0 / this.n;
		const uu_half = u_unit / 2;
		this.polyTexUVList = [];
		for(let i = 0;i < this.n;++i)
		{
   			this.polyTexUVList.push({ u: 0.5                               , v: 1.0 - t });	//n
			this.polyTexUVList.push({ u: 0.5 + (t / 10) + u_unit * i       , v: 2.0 - t });	//0
			this.polyTexUVList.push({ u: 0.5 + (t / 10) + u_unit * (i + 1) , v: 2.0 - t });	//1
		}
	}
}

const NEAR_Z_POS            = 10;			// Min Z direction value allowed for drawing
const FAR_Z_POS             = 1000;			// Max Z direction value allowed for drawing
const INVALID_Z_VALUE       = 10000.0;		// Invalid Z value
const DEFAULT_AMBIENT_LIGHT = 0.1;			// Default ambient light value (Common for R/G/B)
const DEFAULT_DEFUSE_LIGHT  = 0.7;			// Default diffuse light value (Common for R/G/B)
const DEFAULT_LIGHT_X       =  0.2;			// Default light source vector X direction
const DEFAULT_LIGHT_Y       =  0.2;			// Default light source vector Y direction
const DEFAULT_LIGHT_Z       = -1.0;			// Default light source vector Z direction
											// ^ It's not coordinates, it's a vector (direction)
											//  It's the direction the light source is facing (for right-handed coordinate system)

class RenderingMan
{
	// Constructor
	constructor(screen,offscreen,algo_label)
	{
		// Initialization
		this.sc             = screen;
		this.sc_w           = screen.width;
		this.sc_h           = screen.height;
		this.sc_ctx         = screen.getContext("2d");
		this.offsc          = offscreen;
		this.algo           = algo_label;
		
		this.mtx_model      = new MatrixMan4();
		this.mtx_view       = new MatrixMan4();
		this.mtx_projection = new MatrixMan4();
		this.mtx_viewport   = new MatrixMan4();
		this.mtx_mvp        = new MatrixMan4();
		
		// TODO * Create view vector from View transformation matrix?
		this.vEye           = new VectorMan3(0,0,-1);						// View vector facing Z- (for right-handed coordinate system)
		this.vLight         = new VectorMan3(DEFAULT_LIGHT_X,				// Light source direction vector
						  					 DEFAULT_LIGHT_Y,
						  					 DEFAULT_LIGHT_Z);
		this.vAmbientColor  = new VectorMan3(DEFAULT_AMBIENT_LIGHT,			// Ambient Light Color
											 DEFAULT_AMBIENT_LIGHT,
											 DEFAULT_AMBIENT_LIGHT);
		this.vAmbientColorTex = new VectorMan3(DEFAULT_AMBIENT_LIGHT * 255,	// Ambient Light Color (For Texture)
											   DEFAULT_AMBIENT_LIGHT * 255,
											   DEFAULT_AMBIENT_LIGHT * 255);
		this.vDiffuseColor = new VectorMan3(DEFAULT_DEFUSE_LIGHT,			// Diffuse Light Color
											DEFAULT_DEFUSE_LIGHT,
											DEFAULT_DEFUSE_LIGHT);
											
		// Work for calculating normal vector of polygon
		this.nv_n = new VectorMan3();
		this.nv_a = new VectorMan3();
		this.nv_b = new VectorMan3();
		
		// Work for performing MVP transformation
		this.mvp_vertex_list = [];
		for(let i = 0; i < 64;++i)
		{	this.mvp_vertex_list.push(new VertexMan());	}
		
		// Work to apply ViewPort transformation
		this.vpt_vertex1 = new VectorMan4();
		this.vpt_vertex2 = new VectorMan4();
		this.vpt_vertex3 = new VectorMan4();
		
		// Work for target pixel coordinates of EdgeFunction
		this.target_p = new VectorMan4();
		
		// Z buffer
		this.aZBuffer = new Float32Array(this.sc_w * this.sc_h);	// Faster with Float32Array
		
		// Texture management information
		this.tex_info = {};
		this.texture  = null;
		this.enable_tex_transparent = false;
		
		// Prepare off-screen for Bloom Processing
		this.setupBloom();
		
		// Initialize rendering method
		this.setupFlatShading();
	}
	
	// Prepare off-screen for Bloom Processing
	setupBloom()
	{
		// Create off-screen canvas
		this.bloom_offscs = [];
		let scale = 0.5;
		for(let i = 0;i < 3;++i)
		{
			const cv   = document.createElement("canvas");
			const ctx  = cv.getContext("2d");
			const cv_w = this.sc_w * scale;
			const cv_h = this.sc_h * scale;
			
			cv.width  = this.sc_w * scale;
			cv.height = this.sc_h * scale;
			cv.style.display = "none";
			
			let info =
			{
				cv: cv, cv_w: cv_w, cv_h: cv_h,
				ctx: ctx, s: scale
			};
			this.bloom_offscs.push(info);
			
			scale /= 2.0;
		}

	}
	
	// Set light source vector
	setLightVector(x,y,z)
	{
		this.vLight = new VectorMan3(x,y,z);
	}
	
	// Set ambient light color
	setAmbientLightColor(r,g,b)
	{
		this.vAmbientColor  = new VectorMan3(r,g,b);
	}
	setAmbientLightColorTex(r,g,b)
	{
		this.vAmbientColorTex  = new VectorMan3(r,g,b);
	}
	
	// Register texture
	registerTexture(id,img)
	{
		// Generate Canvas element and get ImageData in advance
		const img_w = img.naturalWidth;
		const img_h = img.naturalHeight;
		const cv    = document.createElement("canvas");
		const ctx   = cv.getContext("2d");
		
		cv.width         = img_w;
		cv.height        = img_h;
		cv.style.display = "none";
		
		ctx.drawImage(img,0,0);
		let imgdata = ctx.getImageData(0,0,img_w,img_h);
		
		// Register with specified ID
		this.tex_info[id] =
		{
			cv: cv, ctx: ctx, 
			tex_w: img_w, tex_h: img_h,
			imgdata: imgdata
		};
		
	}
	registerTexture_from_canvas(id,canvas)
	{
		// Get ImageData from Canvas element in advance
		const img_w = canvas.width;
		const img_h = canvas.height;
		const cv    = canvas;
		const ctx   = cv.getContext("2d");
		
		let imgdata = ctx.getImageData(0,0,img_w,img_h);
		
		// Register with specified ID
		this.tex_info[id] =
		{
			cv: cv, ctx: ctx, 
			tex_w: img_w, tex_h: img_h,
			imgdata: imgdata
		};
		
	}
	
	registerTexture_from_iamgedata(id,cv,ctx,img_w,img_h,imgdata)
	{
	
		// Register with specified ID
		this.tex_info[id] =
		{
			cv: cv, ctx: ctx, 
			tex_w: img_w, tex_h: img_h,
			imgdata: imgdata
		};
		
	}
	
	// Texture selection
	selectTexture(id)
	{
		if(id == "")
		{	this.texture = null;	}
		else
		{	this.texture = this.tex_info[id];	}
	}
	
	// Toggle texture transparency ON/OFF
	setEnableTextureTransparent(flag)
	{
		this.enable_tex_transparent = flag;
	}
	
	// Set diffuse light color
	setDefuseLightColor(r,g,b)
	{
		this.vDiffuseColor  = new VectorMan3(r,g,b);
	}
	
	// Prepare with Canvas LINE drawing
	setupContextLine()
	{
		this.funcDrawBegin     = this.drawBegin_context_line;
		this.funcDrawEnd       = this.drawEnd_context_line;
		this.funcDrawLine      = this.drawLine_context_line;
		this.funcDrawPrimitive = this.drawPolygonWithWireframe;
		
		this.algo.innerText = "context.lineTo";
	}
	
	// Canvas LINE drawing pre-processing
	drawBegin_context_line(ctx,sc_w,sc_h,clearFunc)
	{
		// Screen Clear
		if(clearFunc)
		{	clearFunc(ctx,sc_w,sc_h,this.offsc);	}
		else
		{	ctx.clearRect(0,0,sc_w,sc_h);			}
		
		// Determine wire color
		ctx.strokeStyle = 'lime';
		
		// Instruction to start drawing registration
		ctx.beginPath();
	}
	
	// Canvas LINE drawing post-processing
	drawEnd_context_line(ctx,sc_w,sc_h,postFunc)
	{
		// Instruction to execute drawing
		ctx.stroke();
		
		// Post-drawing processing
		if(postFunc)
		{	postFunc(ctx,sc_w,sc_h,this);	}
	}
	
	// Canvas LINE drawing processing
	drawLine_context_line(ctx,sc_w,sc_h,x1,y1,x2,y2)
	{
		// LINE Drawing
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
	}
	
	// Prepare with Bresenham LINE drawing
	setupBresenhamLine()
	{
		this.funcDrawBegin     = this.drawBegin_bresenham;
		this.funcDrawEnd       = this.drawEnd_bresenham;
		this.funcDrawLine      = this.drawLine_bresenham;
		this.funcDrawPrimitive = this.drawPolygonWithWireframe;
		
		this.algo.innerText = "bresenham line";
	}
	
	// Bresenham LINE drawing pre-processing
	drawBegin_bresenham(ctx,sc_w,sc_h,clearFunc)
	{
		// Screen Clear
		if(clearFunc)
		{
			clearFunc(ctx,sc_w,sc_h,this.offsc);
		}
		else
		{
			// Fast Clear
			let data = this.offsc.data;	// Move reference to local variable temporarily
			data.fill(0);				// Faster than counting with for loop if zero-filling
		}
		
		// Determine wire color
		this.line_color = { r: 0, g: 255, b: 0, a: 255 };
	}
	
	// Bresenham LINE drawing post-processing
	drawEnd_bresenham(ctx,sc_w,sc_h,postFunc)
	{
		// Transfer off-screen
		ctx.putImageData(this.offsc,0,0);
		
		// Post-drawing processing
		if(postFunc)
		{	postFunc(ctx,sc_w,sc_h,this);	}
	}
	
	// Bresenham LINE drawing processing
	drawLine_bresenham(ctx,sc_w,sc_h,x1,y1,x2,y2)
	{
		// Convert to integer (Important! if not done, writing to ImageData will fail)
		x1 = Math.floor(x1);
		y1 = Math.floor(y1);
		x2 = Math.floor(x2);
		y2 = Math.floor(y2);
		
		// Parameter preparation
		let dx   = Math.abs(x2 - x1);
		let dy   = Math.abs(y2 - y1);
		let addX = (x1 < x2) ? 1 : -1;
		let addY = (y1 < y2) ? 1 : -1;

		// Clipping
		if(((x1 < 0) && (x2 < 0)) || ((x1 >= sc_w) && (x2 >= sc_w)) ||
		   ((y1 < 0) && (y2 < 0)) || ((y1 >= sc_h) && (y2 >= sc_h)))
		{	return;	}
		
		if(dx > dy)
		{
			// Loop by X
			let diff = Math.floor(dy - dx / 2);

			while(x1 != x2)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);

				// Update Coordinates
				x1 += addX;
				if(diff >= 0)
				{
					y1   += addY;
					diff -= dx;
				}
				diff += dy;
			}
		}
		else
		{
			// Loop by Y
			let diff = Math.floor(dx - dy / 2);

			while(y1 != y2)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);

				// Update Coordinates
				y1 += addY;
				if(diff >= 0)
				{
					x1   += addX;
					diff -= dy;
				}
				diff += dx;
			}
		}

		// Draw end point
		this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
	}
	
	// Point drawing for Bresenham LINE drawing
	drawPoint_bresenham(sc_w,sc_h,x,y,color)
	{
		// Clip and draw
		if((x >= 0) && (x < sc_w) && (y >= 0) && (y < sc_h))
		{
			const pos = (sc_w << 2) * y + (x << 2);		// = (sc_w * 4) * y + (x * 4)
			this.offsc.data[pos + 0] = color.r;
			this.offsc.data[pos + 1] = color.g;
			this.offsc.data[pos + 2] = color.b;
			this.offsc.data[pos + 3] = color.a;
		}
	}
	
	// Prepare with double-step Bresenham LINE drawing
	setupDoubleStepBresenhamLine()
	{
		this.funcDrawBegin     = this.drawBegin_bresenham;
		this.funcDrawEnd       = this.drawEnd_bresenham;
		this.funcDrawLine      = this.drawLine_doublestep_bresenham;
		this.funcDrawPrimitive = this.drawPolygonWithWireframe;
		
		this.algo.innerText = "double-step bresenham line";
	}
	
	// Double-step Bresenham LINE drawing processing
	drawLine_doublestep_bresenham(ctx,sc_w,sc_h,x1,y1,x2,y2)
	{
		// Convert to integer (Important! if not done, writing to ImageData will fail)
		x1 = Math.floor(x1);
		y1 = Math.floor(y1);
		x2 = Math.floor(x2);
		y2 = Math.floor(y2);
		
		// Parameter preparation
		let dx   = Math.abs(x2 - x1);
		let dy   = Math.abs(y2 - y1);
		let addX = (x1 < x2) ? 1 : -1;
		let addY = (y1 < y2) ? 1 : -1;
		let e,n,nn; // e is accumulated error value
		
		// Clipping
		if(((x1 < 0) && (x2 < 0)) || ((x1 >= sc_w) && (x2 >= sc_w)) ||
		   ((y1 < 0) && (y2 < 0)) || ((y1 >= sc_h) && (y2 >= sc_h)))
		{	return;	}
		
		// When completely horizontal line
		if(dy == 0)
		{
			// Loop is half the difference since proceeding from both ends
			n = dx >> 1;	//n = dx / 2;
			
			// Drawing Loop
			for(let i = 0;i <= n;++i)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
				this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
				
				// Update drawing position
				x1 += addX;
				x2 -= addX;
			}
		
			// Draw last 1 pixel if drawing amount is odd
			if((dx & 0x01) == 0)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1 - addX,y1,this.line_color);
			}
		}
		// When completely vertical line
		else if(dx == 0)
		{
			// Loop is half the difference since proceeding from both ends
			n = dy >> 1;	//n = dy / 2;
			
			// Drawing Loop
			for(let i = 0;i <= n;++i)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
				this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);

				// Update drawing position
				y1 += addY;
				y2 -= addY;
			}
		
			// Draw last 1 pixel if drawing amount is odd
			if((dy & 0x01) == 0)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1,y1 - addY,this.line_color);
			}
		}
		else if(dx >= dy) 
		{
			// When looping for X

			// Initialize error value
			e = -dx;

			// Calculation of loop count
			n = (dx + 1) >> 2;	//n = (dx + 1) / 4;

			// In case m < 1/2, m = |x2 - x1| / |y2 - y1|
			if((dy << 2) < (dx << 1))
			{
				for(let i = 0;i < n;++i)
				{
					// Update error value
					e += (dy << 2);	//e += 4dy;
					
					if(e < 0)
					{
						// ●●○

						// Draw points for 2 pixels simultaneously
						this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x1 + addX,y1,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x2 - addX,y2,this.line_color);
						
						// Update drawing position
						x1 += (addX << 1);	//x1 += 2addX;
						x2 -= (addX << 1);	//x2 -= 2addX;
					}
					else
					{
						if(e < (dy << 1))	//if(e < 2dy)
						{
							//    ○
							// ●●

							// Draw points for 2 pixels simultaneously
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x1 + addX,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2 - addX,y2,this.line_color);
							
							// Update drawing position
							x1 += (addX << 1);	//x1 += 2addX;
							x2 -= (addX << 1);	//x2 -= 2addX;
							y1 += addY;
							y2 -= addY;
							
							// Update error value
							e -= (dx << 1);		//e -= 2dx;
						}
						else
						{
							//  ●○
							// ●

							// Draw 2 pixels simultaneously

							// Draw 1st pixel
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
							
							// Update drawing position
							y1 += addY;
							y2 -= addY;
							
							// Draw 2nd pixel
							this.drawPoint_bresenham(sc_w,sc_h,x1 + addX,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2 - addX,y2,this.line_color);

							// Update drawing position
							x1 += (addX << 1);	//x1 += 2addX; 
							x2 -= (addX << 1);	//x2 -= 2addX;
								
							// Update error value
							e -= (dx << 1);		//e -= 2dx;
						}
					}
				}
			}
			// Case 1/2 ≦ m ≦ 1: m = |y2 - y1| / |x2 - x1|
			else
			{
				for(let i = 0;i < n;++i)
				{
					// Update error value
					e += ((dy << 2) - (dx << 1));	//e += 4dy - 2dx;
					
					if(e >= 0)
					{	
						//    ○
						//  ●
						// ●

						// Draw 2 pixels simultaneously
						this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x1 + addX,y1 + addY,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x2 - addX,y2 - addY,this.line_color);

						// Update drawing position
						x1 += (addX << 1);	//x1 += 2addX;
						x2 -= (addX << 1);	//x2 -= 2addX;
						y1 += (addY << 1);	//y1 += 2addY;
						y2 -= (addY << 1);	//y2 -= 2addY;
						
						// Update error value
						e -= (dx << 1);		//e -= 2dx;
					}
					else
					{
						if(e < ((dy << 1) - (dx << 1)))	//if(e < 2dy - 2dx)
						{
							//    ○
							// ●●

							// Draw 2 pixels simultaneously
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x1 + addX,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2 - addX,y2,this.line_color);

							// Update drawing position
							x1 += (addX << 1);	//x1 += 2addX;
							x2 -= (addX << 1);	//x2 -= 2addX;
							y1 += addY;
							y2 -= addY;
						}
						else
						{
							//  ●○
							// ●

							// Draw 2 pixels simultaneously
							
							// Draw 1st pixel
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);

							// Update drawing position
							y1 += addY;
							y2 -= addY;
							
							// Draw 2nd pixel
							this.drawPoint_bresenham(sc_w,sc_h,x1 + addX,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2 - addX,y2,this.line_color);

							// Update drawing position
							x1 += (addX << 1);	//x1 += 2addX;
							x2 -= (addX << 1);	//x2 -= 2addX;
						}
					}
				}
			}

			// Draw fractional part less than 4 pixels
			
			// Calculate loop count
			n = ((dx + 1) % 4);
			
			for(let i = 0;i < n;++i)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
				
				// Update drawing position
				x1 += addX;
				
				// Update error value
				e += (dy << 1);		//e += 2dy;

				if(e >= 0)
				{
					// Update drawing position
					y1 += addY;

					// Update error value
					e -= (dx << 1);		//e -= 2dx;
				}
			}
		}
		else
		{
			// Loop for Y

			// Initialize error value
			e = -dy;

			// Calculate loop count
			n = (dy + 1) >> 2;	//n = (dy + 1) / 4;

			// In case m < 1/2, m = |y2 - y1| / |x2 - x1|
			if(dy >= (dx << 1))
			{
				for(let i = 0; i < n;++i)
				{
					// Update error value
					e += (dx << 2);	//e += 4dx;
					
					if(e < 0)
					{
						//○
						// ●
						// ● 
						
						// Draw 2 pixels simultaneously
						this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x1,y1 + addY,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x2,y2 - addY,this.line_color);
						
						// Update drawing position
						y1 += (addY << 1);	//y1 += 2addY;
						y2 -= (addY << 1);	//y2 -= 2addY;
					}
					else
					{
						if(e < (dx << 1))	//if(e < 2dx)
						{
							//  ○
							// ●
							// ●

							// Draw 2 pixels simultaneously
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1 + addY,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2 - addY,this.line_color);

							// Update drawing position
							y1 += (addY << 1);	//y1 += 2addY;
							y2 -= (addY << 1);	//y2 -= 2addY;
							x1 += addX;
							x2 -= addX;
							
							// Update error value
							e -= (dy << 1);		//e -= 2dy;
						}
						else
						{
							//  ○
							//  ●
							// ●

							// Draw 2 pixels simultaneously

							// Draw 1st pixel
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
							
							// Update drawing position
							x1 += addX;
							x2 -= addX;
							
							// Draw 2nd pixel
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1 + addY,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2 - addY,this.line_color);
							
							// Update drawing position
							y1 += (addY << 1);	//y1 += 2addY;
							y2 -= (addY << 1);	//y2 -= 2addY;
							
							// Update error value
							e -= (dy << 1);		//e -= 2dy;
						}
					}
				}
			}
			// Case 1/2 ≦ m ≦ 1: m = |y2 - y1| / |x2 - x1|
			else
			{
				for(let i = 0;i < n;++i)
				{
					// Update error value
					e += (dx << 2) - (dy << 1);		//e += (4dx - 2dy);
					
					if(e >= 0)
					{
						//    ○
						//  ●
						// ●

						// Draw 2 pixels simultaneously
						this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x1 + addX,y1 + addY,this.line_color);
						this.drawPoint_bresenham(sc_w,sc_h,x2 - addX,y2 - addY,this.line_color);
						
						// Update drawing position
						x1 += (addX << 1);	//x1 += 2addX;
						x2 -= (addX << 1);	//x2 -= 2addX;
						y1 += (addY << 1);	//y1 += 2addY;
						y2 -= (addY << 1);	//y2 -= 2addY;
						
						// Update error value
						e -= (dy << 1);		//e -= 2dy;
					}
					else
					{
						if(((dx << 1) - (dy << 1)) > e)	//if((2dx - 2dy) > e)
						{
							//  ○
							// ●　
							// ●

							// Draw 2 pixels simultaneously
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1 + addY,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2 - addY,this.line_color);

							// Update drawing position
							y1 += (addY << 1);	//y1 += 2addY;
							y2 -= (addY << 1);	//y2 -= 2addY;
							x1 += addX;
							x2 -= addX;
						}
						else
						{
							//  ○
							//  ●
							// ●

							// Draw 2 pixels simultaneously

							// Draw 1st pixel
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);

							// Update drawing position
							x1 += addX;
							x2 -= addX;
							
							// Draw 2nd pixel
							this.drawPoint_bresenham(sc_w,sc_h,x1,y1 + addY,this.line_color);
							this.drawPoint_bresenham(sc_w,sc_h,x2,y2 - addY,this.line_color);
							
							// Update drawing position
							y1 += (addY << 1);	//y1 += 2addY;
							y2 -= (addY << 1);	//y2 -= 2addY;
						}
					}
				}
			}

			// Draw fractional part less than 4 pixels 
			
			// Calculate loop count
			n = ((dy + 1) % 4);

			for(let i = 0;i < n;++i)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
				
				// Update drawing position
				y1 += addY;

				// Update error value
				e += (dx << 1);		//e += 2dx;
			
				if(e >= 0)
				{
					// Update drawing position
					x1 += addX;

					// Update error value
					e -= (dy << 1);	//e -= 2dy;
				}
			}
		}
	}
	
	// Prepare with anti-aliased Bresenham LINE drawing
	setupBresenhamLineAA()
	{
		this.funcDrawBegin = this.drawBegin_bresenham;
		this.funcDrawEnd   = this.drawEnd_bresenham;
		this.funcDrawLine  = this.drawLine_bresenham_aa;
		
		this.algo.innerText = "bresenham antialiased-line";
	}
	
	getPixelColor(sc_w,sc_h,x,y)
	{
		// Get color of specified coordinate
		
		let color = { r:0, g:0, b:0, a:0 };
		if((x >= 0) && (x < sc_w) && (y >= 0) && (y < sc_h))
		{
			const pos = (sc_w << 2) * y + (x << 2);		// = (sc_w * 4) * y + (x * 4)
			color.r = this.offsc.data[pos + 0];
			color.g = this.offsc.data[pos + 1];
			color.b = this.offsc.data[pos + 2];
			color.a = this.offsc.data[pos + 3];
		}
		
		return color;
	}

	calcAlphaBrendColor(dst_color,src_color,alpha)
	{
		// Calculate color processed with alpha blending
		//
		// dst_color	Color at the drawing destination
		// src_color	Drawing color
		// alpha		Alpha value (16bit fractional part of fixed point)
		//
		
		// Blend color at drawing destination with (1 - alpha) and drawing color with alpha
		let color = { r:0, g:0, b:0, a:255 };
		
		//
		// color = (dst * (1 - a)) + (src * a)
		//       = dst - dst * a + src * a
		//       = dst + src * a - dst * a
		//       = dst + (src - dst) * a
		//
		
		color.r = dst_color.r + (((src_color.r - dst_color.r) * alpha) >> 16);
		color.g = dst_color.g + (((src_color.g - dst_color.g) * alpha) >> 16);
		color.b = dst_color.b + (((src_color.b - dst_color.b) * alpha) >> 16);

		return color;
	}

	// Anti-aliased Bresenham LINE drawing processing
	drawLine_bresenham_aa(ctx,sc_w,sc_h,x1,y1,x2,y2)
	{
		// Convert to integer (Important! if not done, writing to ImageData will fail)
		x1 = Math.floor(x1);
		y1 = Math.floor(y1);
		x2 = Math.floor(x2);
		y2 = Math.floor(y2);
		
		// Parameter preparation
		const dx   = Math.abs(x2 - x1);
		const dy   = Math.abs(y2 - y1);
		const addX = (x1 < x2) ? 1 : -1;
		const addY = (y1 < y2) ? 1 : -1;
		let x,y,alpha;
		let alpha_color = { r: this.line_color.r, g: this.line_color.g, b: this.line_color.b, a: 0 };
		
		// Clipping
		if(((x1 < 0) && (x2 < 0)) || ((x1 >= sc_w) && (x2 >= sc_w)) ||
		   ((y1 < 0) && (y2 < 0)) || ((y1 >= sc_h) && (y2 >= sc_h)))
		{	return;	}
		
		// When completely horizontal line
		if(dy == 0)
		{
			// Loop is half the difference since proceeding from both ends
			const n = dx >> 1;	//n = dx / 2;
			
			// Drawing Loop
			for(let i = 0;i <= n;++i)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
				this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);
				
				// Update drawing position
				x1 += addX;
				x2 -= addX;
			}
		
			// Draw last 1 pixel if drawing amount is odd
			if((dx & 0x01) == 0)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1 - addX,y1,this.line_color);
			}
		}
		// When completely vertical line
		else if(dx == 0)
		{
			// Loop is half the difference since proceeding from both ends
			const n = dy >> 1;	//n = dy / 2;
			
			// Drawing Loop
			for(let i = 0;i <= n;++i)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1,y1,this.line_color);
				this.drawPoint_bresenham(sc_w,sc_h,x2,y2,this.line_color);

				// Update drawing position
				y1 += addY;
				y2 -= addY;
			}
		
			// Draw last 1 pixel if drawing amount is odd
			if((dy & 0x01) == 0)
			{
				// Draw Point
				this.drawPoint_bresenham(sc_w,sc_h,x1,y1 - addY,this.line_color);
			}
		}
		else if(dx > dy)
		{
			// Loop by X
			
			// Convert only Y coordinate to fixed point
			y1 = y1 << 16;
			y2 = y2 << 16;
			
			// Calculate fixed-point error value
			let e = (y2 - y1) / dx;

			while(x1 != x2)
			{
				// Get alpha value
				alpha = (y1 & 0xFFFF);
				
				// Convert Y coordinate to integer
				y = y1 >> 16;

				// Draw line part
				const color_line = this.calcAlphaBrendColor(this.getPixelColor(sc_w,sc_h,x1,y),this.line_color,0x10000-alpha);
				this.drawPoint_bresenham(sc_w,sc_h,x1,y,color_line);

				// Draw anti-aliased part
				const color_anti = this.calcAlphaBrendColor(this.getPixelColor(sc_w,sc_h,x1,y+1),this.line_color,alpha);
				this.drawPoint_bresenham(sc_w,sc_h,x1,y+1,color_anti);

				// Update Coordinates
				x1 += addX;
				y1 += e;
			}
			
			// Draw end point
			this.drawPoint_bresenham(sc_w,sc_h,x2,(y2 >> 16),this.line_color);
		}
		else
		{
			// Loop by Y
			
			// Convert only X coordinate to fixed point
			x1 = x1 << 16;
			x2 = x2 << 16;
			
			// Calculate fixed-point error value
			let e = (x2 - x1) / dy;

			while(y1 != y2)
			{
				// Get alpha value
				alpha = (x1 & 0xFFFF);
				
				// Convert X coordinate to integer
				x = x1 >> 16;
				
				// Draw line part
				const color_line = this.calcAlphaBrendColor(this.getPixelColor(sc_w,sc_h,x,y1),this.line_color,0x10000-alpha);
				this.drawPoint_bresenham(sc_w,sc_h,x,y1,color_line);

				// Draw anti-aliased part
				const color_anti = this.calcAlphaBrendColor(this.getPixelColor(sc_w,sc_h,x+1,y1),this.line_color,alpha);
				this.drawPoint_bresenham(sc_w,sc_h,x+1,y1,color_anti);

				// Update Coordinates
				x1 += e;
				y1 += addY;
			}
			
			// Draw end point
			this.drawPoint_bresenham(sc_w,sc_h,(x2 >> 16),y2,this.line_color);
		}
	}	
	// Prepare with flat shading
	setupFlatShading()
	{
		this.funcDrawBegin     = this.drawBegin_flatshading;
		this.funcDrawEnd       = this.drawEnd_bresenham;
		this.funcDrawLine      = this.drawLine_bresenham;
		this.funcDrawPrimitive = this.drawPolygonWithFlatShading;
		
		this.algo.innerText = "Flat Shading";
	}
	
	// Flat shading drawing pre-processing
	drawBegin_flatshading(ctx,sc_w,sc_h,clearFunc)
	{
		// Screen Clear
		if(clearFunc)
		{
			clearFunc(ctx,sc_w,sc_h,this.offsc);
		}
		else
		{
			// Fast Clear
			let data = this.offsc.data;	// Move reference to local variable temporarily
			data.fill(0);				// Faster than counting with for loop if zero-filling
		}
		
		// Clear Z buffer
		this.aZBuffer.fill(INVALID_Z_VALUE);
	}
	
	
	// Set model transformation matrix
	setModelMatrix(m)
	{
		this.mtx_model.copy(m);
	}
	
	// Set View Transformation Matrix
	setViewMatrix(m)
	{
		this.mtx_view.copy(m);
	}
	
	// Set Projection Transformation Matrix
	setProjectionMatrix(m)
	{
		this.mtx_projection.copy(m);
	}
	
	// Set Viewport Transformation Matrix
	setViewPortMatrix(m)
	{
		this.mtx_viewport.copy(m);
	}
	
	// Preparation of vertex work list for MVP transformation
	prepareVertexWorkList(need_vertex_num)
	{
		// Expand work list if size is insufficient
		if(this.mvp_vertex_list.length < need_vertex_num)
		{
			// Reallocate
			this.mvp_vertex_list = [];
			for(let i = 0;i < need_vertex_num * 2;++i)
			{	this.mvp_vertex_list.push(new VertexMan());	}
		}
	}
	
	// Pre-drawing processing
	drawBegin(clearFunc = null)
	{
		this.funcDrawBegin(this.sc_ctx,this.sc_w,this.sc_h,clearFunc);
	}
	
	// Post-drawing processing
	drawEnd(postFunc = null)
	{
		this.funcDrawEnd(this.sc_ctx,this.sc_w,this.sc_h,postFunc);
	}
	
	// Draw Primitives
	drawIndexedPrimitive(vertex_list,vertex_count,index_list,primitive_count,
						 edge_uv_list = null,edge_color = null,
						 texture_uv_list = null)
	{
		//
		// vertex_list		Object vertex data list
		// vertex_count		Number of items in vertex list
		// index_list		Vertex order list
		// primitive_count	Number of primitives
		//					Since one primitive is a triangle with 3 vertices
		//					Number of vertex order lists divided by 3
		// edge_uv_list     List of border UV coordinates corresponding to vertex order
		// edge_color       Border color (If null, do not draw border)
		// texture_uv_list  List of texture UV coordinates corresponding to vertex order
		//

		// Create matrix for MVP (Model View Projection) transformation
		let m = this.mtx_mvp; m.initialize();
		m.mul(this.mtx_model);		// Origin of local coordinates in world coordinates
									// Convert to position
		m.mul(this.mtx_view)		// Adjust entire world to camera position
									// Move/Rotate
		m.mul(this.mtx_projection);	// Project and normalize coordinates to visible range
		
		// Perform up to MVP transformation
		this.prepareVertexWorkList(vertex_count);
		let dst_vertex_list = this.mvp_vertex_list;
		
		for(let i = 0;i < vertex_count;++i)
		{
			// Model-View Transformation
			//
			// From local coordinate system of each 3D object to world coordinate system
			// Transform coordinates so that it becomes the scenery seen from the camera at
			//
			// Projection Transformation
			//
			// In this projection transformation, coordinates are normalized by delimiting the visible range (frustum) from the viewpoint
			// do.											
			// By this, the range of X/Y/Z values in the visible range is converted to -1.0 to 1.0,
			// Need to transform coordinates according to drawing destination screen resolution by next ViewPort transformation
			// There are.
			// Becomes left-handed coordinate system after projection transformation,
			//
			// X = (Left)   -1.0 to 1.0 (Right)
			// Y = (Bottom)   -1.0 to 1.0 (Top)
			// Z = (nearZ)-1.0 ～ 1.0(farZ)
			//
			// It is converted to the range.
			//
			dst_vertex_list[i].copy(vertex_list[i]);
			dst_vertex_list[i].vv.mul_matrix(m);
			
			// Dividing projected X/Y/Z coordinates by w completes X/Y/Z scaling
			dst_vertex_list[i].vv.x /= dst_vertex_list[i].vv.w;
			dst_vertex_list[i].vv.y /= dst_vertex_list[i].vv.w;
			dst_vertex_list[i].vv.z /= dst_vertex_list[i].vv.w;
		}

		// Draw Polygon
		this.funcDrawPrimitive(dst_vertex_list,index_list,primitive_count,
							   edge_uv_list,edge_color,texture_uv_list);

	}
	
	// Draw polygon in wireframe
	drawPolygonWithWireframe(vertex_list,index_list,primitive_count,edge_uv_list,edge_color,texture_uv_list)
	{
		// Draw primitives in order
		let point_index = 0;
		while(primitive_count > 0)
		{
			// Draw triangle in wireframe

			let i1 = index_list[point_index    ];
			let i2 = index_list[point_index + 1];
			let i3 = index_list[point_index + 2];
			
			const x1 = Math.abs(vertex_list[i1].vv.x);
			const x2 = Math.abs(vertex_list[i2].vv.x);
			const x3 = Math.abs(vertex_list[i3].vv.x);
			const y1 = Math.abs(vertex_list[i1].vv.y);
			const y2 = Math.abs(vertex_list[i2].vv.y);
			const y3 = Math.abs(vertex_list[i3].vv.y);
			const z1 = Math.abs(vertex_list[i1].vv.z);
			const z2 = Math.abs(vertex_list[i2].vv.z);
			const z3 = Math.abs(vertex_list[i3].vv.z);
			
			//
			// Draw only what is included in visible range
			//
			// Coordinates passed through projection transformation matrix are as clipping space,
			// X/Y/Z are converted to the range of -1.0 to 1.0.
			// Values with absolute value greater than 1 can be excluded as outside field of view.
			//
			if(((x1 <= 1.0) || (x2 <= 1.0) || (x3 <= 1.0) ||
			    (y1 <= 1.0) || (y2 <= 1.0) || (y3 <= 1.0)) &&
			    (z1 <= 1.0) && (z2 <= 1.0) && (z3 <= 1.0))
			{
				// Create copy to apply ViewPort transformation
				this.vpt_vertex1.copy(vertex_list[i1].vv);
				this.vpt_vertex2.copy(vertex_list[i2].vv);
				this.vpt_vertex3.copy(vertex_list[i3].vv);
				
				// Replace w value with 1
				this.vpt_vertex1.w = 1.0;
				this.vpt_vertex2.w = 1.0;
				this.vpt_vertex3.w = 1.0;
				
				// ViewPort Transformation
				//
				// Matching the direction of Y coordinate to screen coordinate system, and X/Y
				// The coordinate values of ... from the range of -1.0 to 1.0 to the screen width/height
				// Convert to number of pixels.
				// Z value remains as is.
				//
				this.vpt_vertex1.mul_matrix(this.mtx_viewport);
				this.vpt_vertex2.mul_matrix(this.mtx_viewport);
				this.vpt_vertex3.mul_matrix(this.mtx_viewport);
				
				// Draw triangle (Bresenham)
				this.funcDrawLine(this.sc_ctx,this.sc_w,this.sc_h,
								  this.vpt_vertex1.x,this.vpt_vertex1.y,
						   		  this.vpt_vertex2.x,this.vpt_vertex2.y);

				this.funcDrawLine(this.sc_ctx,this.sc_w,this.sc_h,
								  this.vpt_vertex2.x,this.vpt_vertex2.y,
								  this.vpt_vertex3.x,this.vpt_vertex3.y);

				this.funcDrawLine(this.sc_ctx,this.sc_w,this.sc_h,
								  this.vpt_vertex3.x,this.vpt_vertex3.y,
								  this.vpt_vertex1.x,this.vpt_vertex1.y);
			}

			// Update index
			point_index += DEF_VERTEX_NUM_FOR_PRIMITIVE;

			// Reduce Primitives
			primitive_count--;
		}
	}
	
	// Calculate normal vector of triangle polygon
	getNormalVectorFromPolygon(v1,v2,v3)
	{
		// Vector a extending from vertex v1 to vertex v2 and
		// Calculate vector b extending from vertex v1 to vertex v3
		this.nv_a.x = v2.x - v1.x;
		this.nv_a.y = v2.y - v1.y;
		this.nv_a.z = v2.z - v1.z;
		this.nv_b.x = v3.x - v1.x;
		this.nv_b.y = v3.y - v1.y;
		this.nv_b.z = v3.z - v1.z;

		// Taking cross product of vectors a,b results in
		// Vector n perpendicular to plane is obtained.
		this.nv_n.crossProduct(this.nv_a,this.nv_b);

		// The unit vector version of this vector is from vertices v1, v2, v3
		// Becomes normal vector of triangle polygon that becomes
		this.nv_n.normalize();

		return this.nv_n;
	}
	
	// Edge function
	edgeFunction(a,b,c)
	{
		//
		// It becomes the cross product of the vector extending from a to b and the vector extending from a to c.
		// The absolute value of the cross product result is the area of the parallelogram with two vectors as two sides
		// It becomes.
		// Also, the sign of the cross product value can be used for polygon front/back determination and polygon inside/outside determination.
		//
		return (c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x);
	}
	
	// Draw polygon with flat shading
	drawPolygonWithFlatShading(vertex_list,index_list,primitive_count,edge_uv_list,edge_color,texture_uv_list)
	{
		// Draw primitives in order
		let point_index = 0;
		while(primitive_count > 0)
		{
			// Draw triangle polygon with flat shading
			
			const i1 = index_list[point_index    ];
			const i2 = index_list[point_index + 1];
			const i3 = index_list[point_index + 2];

			const x1 = Math.abs(vertex_list[i1].vv.x);
			const x2 = Math.abs(vertex_list[i2].vv.x);
			const x3 = Math.abs(vertex_list[i3].vv.x);
			const y1 = Math.abs(vertex_list[i1].vv.y);
			const y2 = Math.abs(vertex_list[i2].vv.y);
			const y3 = Math.abs(vertex_list[i3].vv.y);
			const z1 = Math.abs(vertex_list[i1].vv.z);
			const z2 = Math.abs(vertex_list[i2].vv.z);
			const z3 = Math.abs(vertex_list[i3].vv.z);
			
			//
			// Draw only what is included in visible range
			//
			// Coordinates passed through projection transformation matrix are as clipping space,
			// X/Y/Z are converted to the range of -1.0 to 1.0.
			// Values with absolute value greater than 1 can be excluded as outside field of view.
			//
			if(((x1 <= 1.0) || (x2 <= 1.0) || (x3 <= 1.0) ||
			    (y1 <= 1.0) || (y2 <= 1.0) || (y3 <= 1.0)) &&
			    (z1 <= 1.0) && (z2 <= 1.0) && (z3 <= 1.0))
			{
				// Calculate normal vector of polygon
				let vNormal = this.getNormalVectorFromPolygon(vertex_list[i1].vv,vertex_list[i2].vv,vertex_list[i3].vv);
				
				// Take dot product of line of sight/light source and polygon normal
				let lightDot = vNormal.dotProduct(this.vLight);	// With light source vector
																// Dot product result with normal vector
				const eyeDot = vNormal.dotProduct(this.vEye);	// With line of sight vector
																// Dot product result with normal vector
				
				//
				// If the dot product result is a negative value, the line of sight vector and the polygon's normal vector
				// Represents that they are roughly facing each other, and if the result is a positive value, the view vector
				// and the normal vector are facing roughly the same direction, meaning it is invisible
				// So, draw only if it's a negative value facing each other.
				// * When performing perspective correction, this judgment may not be correct...
				//
				if(eyeDot < 0.0)
				{
					//
					// Calculate surface color
					// * lightDot is the ratio of light hitting the polygon surface relative to the light ray,
					//   Adjust the diffuse light value.
					//   However, the dot product result of the polygon's normal vector and the light ray vector is negative
					//   value, so multiply by minus to invert it to positive.
					//
					//   If the dot product result becomes a positive number, it means light does not hit
					//   So correct it to 0.
					//
					if(lightDot > 0.0){ lightDot = 0.0; }
					let r = Math.floor((this.vAmbientColor.x + -lightDot * this.vDiffuseColor.x) * 255);
					let g = Math.floor((this.vAmbientColor.y + -lightDot * this.vDiffuseColor.y) * 255);
					let b = Math.floor((this.vAmbientColor.z + -lightDot * this.vDiffuseColor.z) * 255);

					// Saturate to range 0-255
					if(r < 0){ r = 0; }
					else if(r > 255){ r = 255; }
					if(g < 0){ g = 0; }
					else if(g > 255){ g = 255; }
					if(b < 0){ b = 0; }
					else if(b > 255){ b = 255; }

					// Set color
					const color = { r: r, g: g, b: b };
					
					// Create copy to apply ViewPort transformation
					this.vpt_vertex1.copy(vertex_list[i1].vv);
					this.vpt_vertex2.copy(vertex_list[i2].vv);
					this.vpt_vertex3.copy(vertex_list[i3].vv);
					
					// Remember w value as 1/w and replace with 1
					const vw1 = 1 / this.vpt_vertex1.w; this.vpt_vertex1.w = 1.0;
					const vw2 = 1 / this.vpt_vertex2.w; this.vpt_vertex2.w = 1.0;
					const vw3 = 1 / this.vpt_vertex3.w; this.vpt_vertex3.w = 1.0;
					// ^ If you set all vw1-3 to 1, there will be no perspective correction, so it's interesting to try
					
					// ViewPort Transformation
					//
					// Matching the direction of Y coordinate to screen coordinate system, and X/Y
					// The coordinate values of ... from the range of -1.0 to 1.0 to the screen width/height
					// Convert to number of pixels.
					// Z value remains as is.
					//
					this.vpt_vertex1.mul_matrix(this.mtx_viewport);
					this.vpt_vertex2.mul_matrix(this.mtx_viewport);
					this.vpt_vertex3.mul_matrix(this.mtx_viewport);
					
					// Preparation of UV coordinate info per vertex
					let tu1,tv1,tu2,tv2,tu3,tv3;
					if(texture_uv_list != null)
					{
						// Divide UV coordinates of each vertex by w used during projection transformation
						// ((Multiply by 1/w)
						tu1 = texture_uv_list[point_index    ].u * vw1;
						tv1 = texture_uv_list[point_index    ].v * vw1;
						tu2 = texture_uv_list[point_index + 1].u * vw2;
						tv2 = texture_uv_list[point_index + 1].v * vw2;
						tu3 = texture_uv_list[point_index + 2].u * vw3;
						tv3 = texture_uv_list[point_index + 2].v * vw3;
					}
					
					// Create bounding box surrounding 3 vertices of polygon
					const v1 = this.vpt_vertex1;
					const v2 = this.vpt_vertex2;
					const v3 = this.vpt_vertex3;
					let minX = v1.x,minY = v1.y,maxX = v1.x,maxY = v1.y;
					if(v2.x      < minX){ minX = v2.x;      }
					if(v3.x      < minX){ minX = v3.x;      }
					if(minX      < 0   ){ minX = 0;         }
					if(maxX      < v2.x){ maxX = v2.x;      }
					if(maxX      < v3.x){ maxX = v3.x;      }
					if(this.sc_w < maxX){ maxX = this.sc_w; }
					if(v2.y      < minY){ minY = v2.y;      }
					if(v3.y      < minY){ minY = v3.y;      }
					if(minY      < 0   ){ minY = 0;         }
					if(maxY      < v2.y){ maxY = v2.y;      }
					if(maxY      < v3.y){ maxY = v3.y;      }
					if(this.sc_h < maxY){ maxY = this.sc_h; }
					minX = Math.floor(minX);
					maxX = Math.floor(maxX+2);
					minY = Math.floor(minY);
					maxY = Math.floor(maxY+2);

					// Convert to 1/z form in advance
					const z1 = 1 / v1.z;
					const z2 = 1 / v2.z;
					const z3 = 1 / v3.z;
					
					let pos = this.sc_w * minY;
					for(let y = minY;y < maxY;++y)
					{
						for(let x = minX;x < maxX;++x)
						{
							// Interpolate Z coordinate of pixel center
							this.target_p.setValue(x+0.5,y+0.5,1,1);
							
							//
							// Virtual ... obtained by adding 0.5 to candidate X,Y coordinates
							// Pixel center coordinates and coordinates of each polygon vertex
							// using EdgeFunction (2D cross product calculation) from
							// Can calculate ratio of attribute information of 3 vertices occupied by point p.
							//
							// Also, the value obtained by EdgeFunction means point p is inside
							// Can be used to determine if it exists.
							// In the case of a polygon with counter-clockwise vertex order, 0 or positive
							// If it becomes a value, it can be determined as inside.
							//
							// This topic is about EdgeFunction, barycentric coordinate system, etc.
							// I think various things come up if you search.
							// 
							// Reference
							// https://qiita.com/N-H-Shimada/items/edf02a8dc21a4a14c8b0
							// https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-stage
							//
							
							let w0     = this.edgeFunction(v2,v3,this.target_p);	// Cross product of vector v2->p and vector v2->v3, usable for v1 vertex info ratio
							if(w0 < 0){ continue; }									// Skip if not inside polygon
							let w1     = this.edgeFunction(v3,v1,this.target_p);	// Cross product of vector v3->p and vector v3->v1, usable for v2 vertex info ratio
							if(w1 < 0){ continue; }									// Skip if not inside polygon
							let w2     = this.edgeFunction(v1,v2,this.target_p);	// Cross product of vector v1->p and vector v1->v2, usable for v3 vertex info ratio
							if(w2 < 0){ continue; }									// Skip if not inside polygon
							
							//
							// The answer of EdgeFunction is also the area value, so the whole
							// Ratio of attribute info of each vertex can be calculated by dividing by area
							//
							const area = this.edgeFunction(v1,v2,v3);	// Becomes denominator for ratio calculation
							w0 /= area;
							w1 /= area;
							w2 /= area;
							
							//
							// Also regarding the Z value used for front/back determination in Z buffer
							// With correction considering perspective (perspective correction),
							// Need to interpolate Z value, confirmed with quite complicated calculation
							// As a result of doing,
							//
							// 1/Z = w0 * 1/v1.z + w1 * 1/v2.z + w2 * 1/v3.z
							//
							// Found that the relationship holds.
							// In other words, calculate as Z = 1 / (1/Z).
							//
							// Reference
							// https://qiita.com/N-H-Shimada/items/edf02a8dc21a4a14c8b0
							// https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/perspective-correct-interpolation-vertex-attributes
							//
							const Z = 1 / (w0 * z1 + w1 * z2 + w2 * z3);
							
							// Draw if it is in front of Z coordinate of pixel already drawn
							if(this.aZBuffer[pos + x] > Z)
							{
								let c = { r: color.r, g: color.g, b: color.b, a: 255 };
								
								// Boundary line drawing check
								if(edge_color != null)
								{
									// Interpolate UV coordinates for border drawing like Z coordinates
									//
									// This border detection using UV coordinates is from Totsugekihei-san (@Stosstruppe)'s
									// Referenced the border drawing sample.
									// https://twitter.com/Stosstruppe/status/1270940719448903681?s=20
									//
									const eu1    = edge_uv_list[point_index    ].u;
									const eu2    = edge_uv_list[point_index + 1].u;
									const eu3    = edge_uv_list[point_index + 2].u;
									const ev1    = edge_uv_list[point_index    ].v;
									const ev2    = edge_uv_list[point_index + 1].v;
									const ev3    = edge_uv_list[point_index + 2].v;
									const edgeU  = (w0 * eu1 + w1 * eu2 + w2 * eu3);
									const edgeV  = (w0 * ev1 + w1 * ev2 + w2 * ev3);
									let   edgeTh = 0.96;
									
									if((Math.abs(edgeU) > edgeTh) || (Math.abs(edgeV) > edgeTh))
									{
										// Change color because it's boundary line position
										c = { r: edge_color.r, g: edge_color.g, b: edge_color.b, a: 255 };
									}
								}
							
								let put = true;
								if((texture_uv_list != null) && (this.texture != null))
								{
									// If there is UV info, interpolate UV coordinates of each vertex like Z
									//
									// Regarding the texture perspective correction method,
									// Referred to the following site. Thank you!
									// https://qiita.com/hrmtnryk/items/cfe809dbcae0e67bf490
									//
									
									// Calculate w with barycentric coordinates
									const w  = 1 / (w0 * vw1 + w1 * vw2 + w2 * vw3);
									
									// By finding UV with barycentric coordinates and multiplying by 1/w,
									// Perform Perspective Correction
									const tu = ((w0 * tu1 + w1 * tu2 + w2 * tu3) * w) % 1;
									const tv = ((w0 * tv1 + w1 * tv2 + w2 * tv3) * w) % 1;
									
									// Get color from texture
									const tx = Math.floor(this.texture.tex_w * tu);
									const ty = (this.texture.tex_h - 1) - Math.floor(this.texture.tex_h * tv);
									let tex_pos = (ty * this.texture.tex_w + tx) << 2;
									
									// Do not draw transparent parts
									if(this.enable_tex_transparent && this.texture.imgdata.data[tex_pos + 2] == 0)
									{
										put = false;
									}
									else
									{
										// Calculate influence of light source
										let r = Math.floor(this.vAmbientColorTex.x + (-lightDot * this.texture.imgdata.data[tex_pos + 0]));
										let g = Math.floor(this.vAmbientColorTex.y + (-lightDot * this.texture.imgdata.data[tex_pos + 1]));
										let b = Math.floor(this.vAmbientColorTex.z + (-lightDot * this.texture.imgdata.data[tex_pos + 2]));

										// Saturate to range 0-255
										if(r < 0){ r = 0; }
										else if(r > 255){ r = 255; }
										if(g < 0){ g = 0; }
										else if(g > 255){ g = 255; }
										if(b < 0){ b = 0; }
										else if(b > 255){ b = 255; }
										
										c = { r: r, g: g, b: b,a: 255 };
									}
								}
								
								if(put)
								{
									this.drawPoint_bresenham(this.sc_w,this.sc_h,x,y,c);
									this.aZBuffer[pos + x] = Z;	// Update Z value of pixel
								}
							}
						}
						
						// Calculate address of next drawing destination Y coordinate
						pos += this.sc_w;
					}
				}
			}
			
			// To next polygon vertex index
			point_index += DEF_VERTEX_NUM_FOR_PRIMITIVE;

			// Reduce Primitives
			primitive_count--;
		}
	}
	
	// Clear processing for Blur
	clearForBlur(ctx,sc_w,sc_h,offsc)
	{
		// Pre-drawing processing
	
		// Overlay semi-transparent black on previous screen
		ctx.fillStyle = "rgba(0, 0, 0,0.15)";
		ctx.fillRect(0,0,sc_w,sc_h);

		// Re-get ImageData for off-screen
		let imagedata = ctx.getImageData(0,0,sc_w,sc_h);
		offsc.data.set(imagedata.data);
	}
	
	// Post-processing for Bloom effect
	postBloom(ctx,sc_w,sc_h,render)
	{
		// Apply filter to image after rendering
	
		//
		// Doing simple bloom processing.
		//
		// Because it's not extracting only high luminance parts, but whole thing looks glowing,
		// I think it's a bit different from original bloom processing, but anyway
		// Might be easy if you want to make it glow easily (*´ω｀*)
		//
		
		// To off-screen canvas with resolution lowered by half vertically and horizontally in multiple stages
		// Apply Canvas Blur filter, enlarge and additive blend
		const offsc_num = render.bloom_offscs.length;
		let blur_w = [ 4,10,32 ];
		for(let idx = 0;idx < offsc_num;++idx)
		{
			// Get current state from canvas displayed on screen
			let offsc = render.bloom_offscs[idx];
			offsc.ctx.clearRect(0,0,offsc.cv_w,offsc.cv_h);
			offsc.ctx.drawImage(render.sc,0,0,sc_w,sc_h,0,0,offsc.cv_w,offsc.cv_h);

			// Reflect on screen (additive blending) while applying filter to reduced image
			ctx.save();
			ctx.globalCompositeOperation = 'lighter';
			ctx.filter="blur("+blur_w[idx]+"px)";
			ctx.drawImage(offsc.cv,0,0,offsc.cv_w,offsc.cv_h,0,0,sc_w,sc_h);
			ctx.restore();
		}
	}
}

